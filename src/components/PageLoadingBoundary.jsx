import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import loadingImage from "../assets/headLogo.png";
import { PageLoadContext } from "./PageLoadContext";
import "../styles/PageLoading.css";

function waitForImage(image) {
  if (image.complete) {
    if (!image.naturalWidth) {
      console.error(`Unable to load page image: ${image.currentSrc || image.src}`);
      return Promise.resolve();
    }

    return image.decode().catch((error) => {
      console.error(`Unable to decode page image: ${image.currentSrc || image.src}`, error);
    });
  }

  return new Promise((resolve) => {
    const finish = () => {
      image.removeEventListener("load", finish);
      image.removeEventListener("error", finish);
      if (image.naturalWidth) {
        image.decode().catch((error) => {
          console.error(`Unable to decode page image: ${image.currentSrc || image.src}`, error);
        }).finally(resolve);
      } else {
        console.error(`Unable to load page image: ${image.currentSrc || image.src}`);
        resolve();
      }
    };

    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });
  });
}

function waitForBackgroundImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      image.decode().catch((error) => {
        console.error(`Unable to decode page background: ${url}`, error);
      }).finally(resolve);
    };
    image.onerror = () => {
      console.error(`Unable to load page background: ${url}`);
      resolve();
    };
    image.src = url;
    if (image.complete) {
      if (image.naturalWidth) {
        image.decode().catch((error) => {
          console.error(`Unable to decode page background: ${url}`, error);
        }).finally(resolve);
      } else {
        console.error(`Unable to load page background: ${url}`);
        resolve();
      }
    }
  });
}

function waitForFrame(frame) {
  const isLoaded = () => {
    const document = frame.contentDocument;
    return (
      document?.readyState === "complete" &&
      Boolean(document.body?.childNodes.length)
    );
  };
  if (isLoaded()) return Promise.resolve();

  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => {
      frame.removeEventListener("load", finish);
      console.error(`Timed out loading embedded page: ${frame.title}`);
      resolve();
    }, 20000);
    const finish = () => {
      window.clearTimeout(timeout);
      frame.removeEventListener("load", finish);
      resolve();
    };
    frame.addEventListener("load", finish, { once: true });
    if (isLoaded()) finish();
  });
}

function collectPageAssets(root) {
  const elements = [root, ...root.querySelectorAll("*")];
  const images = [...root.querySelectorAll("img")];
  const frames = [...root.querySelectorAll("iframe")];
  const backgrounds = new Set();
  const urlPattern = /url\(["']?(.*?)["']?\)/g;

  for (const element of elements) {
    const background = window.getComputedStyle(element).backgroundImage;
    for (const match of background.matchAll(urlPattern)) {
      if (match[1] && !match[1].startsWith("data:")) {
        backgrounds.add(match[1]);
      }
    }
  }

  return {
    images,
    frames,
    backgrounds: [...backgrounds],
    signature: [
      ...images.map((image) => image.currentSrc || image.src),
      ...frames.map((frame) => frame.src || frame.srcdoc),
      ...backgrounds,
    ].join("|"),
  };
}

function waitForNextFrames() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

async function waitForPageAssets(root) {
  await document.fonts?.ready;
  const backgroundLoads = new Map();
  const frameLoads = new Map();
  let lastSignature = "";
  let stableFrames = 0;

  while (stableFrames < 2) {
    const assets = collectPageAssets(root);
    await Promise.all([
      ...assets.images.map(waitForImage),
      ...assets.backgrounds.map((url) => {
        if (!backgroundLoads.has(url)) {
          backgroundLoads.set(url, waitForBackgroundImage(url));
        }
        return backgroundLoads.get(url);
      }),
      ...assets.frames.map((frame) => {
        if (!frameLoads.has(frame)) {
          frameLoads.set(frame, waitForFrame(frame));
        }
        return frameLoads.get(frame);
      }),
    ]);

    await waitForNextFrames();
    const nextSignature = collectPageAssets(root).signature;
    if (nextSignature === assets.signature && nextSignature === lastSignature) {
      stableFrames += 1;
    } else {
      stableFrames = 0;
    }
    lastSignature = nextSignature;
  }
}

export default function PageLoadingBoundary({ children }) {
  const location = useLocation();
  const pageRef = useRef(null);
  const routeKey = `${location.pathname}:${location.key}`;
  const [loadState, setLoadState] = useState(() => ({
    key: routeKey,
    loading: true,
    showLoader: false,
  }));
  const [pendingTasks, setPendingTasks] = useState(() => new Set());
  const reportPending = useCallback(
    (task, isPending) => {
      const taskKey = `${routeKey}:${task}`;
      setPendingTasks((current) => {
        const next = new Set(current);
        if (isPending) next.add(taskKey);
        else next.delete(taskKey);
        return next;
      });
    },
    [routeKey],
  );
  const routeChanged = loadState.key !== routeKey;
  const hasPendingTasks = [...pendingTasks].some((task) =>
    task.startsWith(`${routeKey}:`),
  );
  const loading = routeChanged || loadState.loading || hasPendingTasks;
  const showLoader = !routeChanged && loadState.showLoader;

  useEffect(() => {
    let cancelled = false;
    const showTimer = window.setTimeout(() => {
      if (!cancelled) {
        setLoadState({ key: routeKey, loading: true, showLoader: true });
      }
    }, 120);

    async function loadPage() {
      if (pageRef.current) {
        await waitForPageAssets(pageRef.current);
      }
      if (!cancelled) {
        window.clearTimeout(showTimer);
        setLoadState({ key: routeKey, loading: false, showLoader: false });
      }
    }

    loadPage();
    return () => {
      cancelled = true;
      window.clearTimeout(showTimer);
    };
  }, [routeKey]);

  return (
    <div ref={pageRef} className="page-loading-root" aria-busy={loading}>
      <link rel="preload" as="image" href={loadingImage} />
      <PageLoadContext.Provider value={{ reportPending }}>
        {children}
        {loading && (showLoader || hasPendingTasks) && (
          <div className="page-loader" role="status" aria-label="Loading page">
            <img src={loadingImage} alt="" />
            <span>Loading...</span>
          </div>
        )}
      </PageLoadContext.Provider>
    </div>
  );
}
