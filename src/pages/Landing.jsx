import NavItem from "../components/NavItem";
import Navbar from "../components/Navbar";
import DropdownMenu from "../components/DropdownMenu";
import head from "../assets/headLogo.png";
//import silhouette from "../assets/silhouette.png"
import shreyaChar from "../assets/Shreya-Front.webp";
import text from "../assets/textLogo.png";
import "../styles/Landing.css";
import "../styles/character.css";
import silhouette from "../assets/silhouette - Copy.webp";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import road from "../assets/road.png";
import spinShreya from "../assets/CharacterSpin.gif";
import HelloThere from "../assets/HelloThere.webp";
import BIS from "../assets/BISmmStudent.webp";
import intro1 from "../assets/intro1.webp";
import intro2 from "../assets/intro2.webp";
import intro3 from "../assets/intro3.webp";
import intro4 from "../assets/intro4.webp";
import intro5 from "../assets/intro5.webp";
import shreyaWalking from "../assets/Shreya-Front.webp";
import "../styles/Road.css";
import RoadDecorations from "../assets/RoadDecorations.png";
import ArtStall from "../assets/ArtStall.gif";
import ArtSpeech1 from "../assets/StallExcl.webp";
import ArtSpeech2 from "../assets/StallElip.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModellingStall from "../assets/ModellingStall.gif";
import ScrollIndicator from "../assets/scrollIndicator.png";
import outline from "../assets/outline.webp";
import comic from "../assets/comicObject.png";
import HammerMachine from "../assets/HammerMachine.png";
import contactPost from "../assets/contactPost.png";
import email from "../assets/postEmail.png";
import github from "../assets/postGithub.png";
import linkedin from "../assets/postLinkedin.png";

const UI_KEY = "landingUI";
const SCROLL_KEY = "landingScrollY";
// Once the user scrolls past this many pixels, the intro bubbles are removed for good.
// Tune this to wherever the bubbles finish in your animation.
const BUBBLES_HIDE_SCROLL_Y = 2500;

// Read the UI state saved when the user last left / interacted with the landing page.
function loadSavedUI() {
  try {
    const raw = sessionStorage.getItem(UI_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// The page is very tall and full of images that load late, so a single
// window.scrollTo() often gets clamped to a too-short document.
// Keep retrying every frame until the scroll position actually sticks.
function restoreScroll(target) {
  let tries = 0;
  function attempt() {
    window.scrollTo(0, target);
    if (Math.abs(window.scrollY - target) > 2 && tries++ < 180) {
      requestAnimationFrame(attempt);
    }
  }
  attempt();
}

function Landing() {
  const location = useLocation();
  const navigate = useNavigate();

  // Legacy router-state flags (still honoured as a fallback, e.g. if the user
  // arrived at a subpage directly and the landing page was never visited).
  const returningFromArt = location.state?.fromArt === true;
  const returningFromModelling = location.state?.fromModelling === true;
  const returningFromCodeSkills = location.state?.fromCodeSkills === true;
  const returningToLanding = location.state?.returnToLanding === true;
  const returningFromSubpage =
    returningFromArt ||
    returningFromModelling ||
    returningFromCodeSkills ||
    returningToLanding;

  // Read saved state once, on first render only.
  const [saved] = useState(loadSavedUI);

  const [replaceSil, setReplaceSil] = useState(
    saved?.replaceSil ?? returningFromSubpage,
  );
  const [spin, setSpin] = useState(saved?.spin ?? returningFromSubpage);
  const [isWalking, setIsWalking] = useState(
    saved?.isWalking ?? returningFromSubpage,
  );
  const [ArtClicked, setArtClicked] = useState(saved?.ArtClicked ?? false);
  const [ModelClicked, setModelClicked] = useState(
    saved?.ModelClicked ?? false,
  );
  const [HammerClicked, setHammerClicked] = useState(
    saved?.HammerClicked ?? false,
  );

  const [bubblesGone, setBubblesGone] = useState(saved?.bubblesGone ?? false);

  const [ArtChange, setArtChange] = useState(ArtSpeech1);

  // Tallest document height seen so far. Used to ignore the scroll events the
  // browser fires when it clamps the scroll position as we navigate away.
  const maxHeightRef = useRef(0);
  const walkingAudioRef = useRef(null);

  // Stop the browser from fighting our own scroll restoration.
  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  // Restore the scroll position (or start at the top on a fresh visit).
  useLayoutEffect(() => {
    const savedY = sessionStorage.getItem(SCROLL_KEY);
    const hasSavedY = savedY !== null && Number.isFinite(Number(savedY));

    if (saved && hasSavedY) {
      restoreScroll(Number(savedY));
    } else if (returningFromSubpage) {
      // No saved position: estimate from where each subpage's stall sits.
      const scrollRangeStart = window.innerHeight * 3.5;
      const scrollRangeEnd =
        document.documentElement.scrollHeight - window.innerHeight;
      const animationProgress = returningFromModelling
        ? 0.37
        : returningFromArt
          ? 0.16
          : 0.17;
      restoreScroll(
        Math.max(
          0,
          scrollRangeStart +
            (scrollRangeEnd - scrollRangeStart) * animationProgress,
        ),
      );
    } else {
      window.scrollTo(0, 0);
    }

    // Clear any leftover router state so it doesn't linger in history.
    if (location.state) {
      navigate(location.pathname, { replace: true, state: null });
    }
    // Run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track scroll: remember position, and swap the silhouette once scrolled far enough.
  useEffect(() => {
    let audioPauseTimeout;

    function handleScroll() {
      const walkingAudio = walkingAudioRef.current;
      if (walkingAudio) {
        if (walkingAudio.paused) {
          walkingAudio.play().catch((error) => {
            console.error("Unable to play walking audio:", error);
          });
        }

        window.clearTimeout(audioPauseTimeout);
        audioPauseTimeout = window.setTimeout(() => {
          walkingAudio.pause();
        }, 200);
      }

      const height = document.documentElement.scrollHeight;
      if (height > maxHeightRef.current) {
        maxHeightRef.current = height;
      }

      // Only save while the full-height landing page is on screen. When we
      // navigate away the document shrinks and the browser clamps scrollY,
      // which would otherwise overwrite the good value.
      if (height >= maxHeightRef.current * 0.9) {
        sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
      }

      if (window.scrollY > 850) {
        setReplaceSil(true);
      }

      // Scrolled past the bubbles: remove them permanently.
      if (window.scrollY > BUBBLES_HIDE_SCROLL_Y) {
        setBubblesGone(true);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(audioPauseTimeout);
      walkingAudioRef.current?.pause();
    };
  }, []);

  // Persist UI state whenever it changes, so it survives navigation
  // (including the browser Back button).
  useEffect(() => {
    try {
      sessionStorage.setItem(
        UI_KEY,
        JSON.stringify({
          replaceSil,
          spin,
          isWalking,
          ArtClicked,
          ModelClicked,
          HammerClicked,
          bubblesGone,
        }),
      );
    } catch {
      // storage unavailable (private mode etc.) - ignore
    }
  }, [
    replaceSil,
    spin,
    isWalking,
    ArtClicked,
    ModelClicked,
    HammerClicked,
    bubblesGone,
  ]);

  // Called right before leaving for another page, so the saved scroll is exact.
  function saveLandingScroll() {
    sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
  }

  function changeArtSpeech() {
    setArtChange(ArtSpeech2);
  }

  function startSpin() {
    setSpin(true);
  }

  function toggleArt() {
    setArtClicked(!ArtClicked);
  }

  function toggleModel() {
    setModelClicked(!ModelClicked);
  }

  function toggleHammer() {
    setHammerClicked(!HammerClicked);
  }

  return (
    <>
      <Navbar>
        <NavItem icon={head}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
      <div id="landingBox">
        <div id="textLogoDiv">
          <img src={text} id="textLogo"></img>
        </div>
        <img src={ScrollIndicator} id="ScrollIndicator"></img>
        {!spin && <img src={outline} id="outline" />}
        <div id="silhouetteDiv">
          {!replaceSil ? (
            <img src={silhouette} id="silhouetteCopy" />
          ) : spin ? (
            <div id="ActualSpin">
              {isWalking ? (
                <img src={shreyaWalking} id="shreyaWalking" hidden />
              ) : (
                <img
                  src={spinShreya}
                  id="shreyaCharS"
                  onClick={startSpin}
                  onAnimationEnd={(event) => {
                    if (event.animationName === "shreyaMoveRight") {
                      setIsWalking(true);
                    }
                  }}
                />
              )}

              {!bubblesGone && (
                <div id="bubblesDiv">
                  <img
                    src={HelloThere}
                    id="HelloThere"
                    className="bubbles"
                  ></img>
                  <img src={BIS} id="BIS" className="bubbles"></img>
                  <img src={intro1} id="intro1" className="bubbles"></img>
                  <img src={intro2} id="intro2" className="bubbles"></img>
                  <img src={intro3} id="intro3" className="bubbles"></img>
                  <img src={intro4} id="intro4" className="bubbles"></img>
                  <img src={intro5} id="intro5" className="bubbles"></img>
                </div>
              )}
            </div>
          ) : (
            <div id="spinningDiv">
              <img
                src={shreyaChar}
                id="shreyaChar"
                onClick={startSpin}
                className="spinningShreya"
              />
            </div>
          )}
          <img src={ScrollIndicator} id="ScrollIndicator2"></img>
        </div>
      </div>
      {isWalking ? (
        <img src={shreyaWalking} id="shreyaOutside" />
      ) : (
        <p hidden>helo</p>
      )}

      <img src={road} id="road"></img>

      <div id="ArtStallDiv" onClick={toggleArt}>
        <img src={ArtStall} id="ArtStall"></img>
        {ArtClicked ? (
          <Link
            to="/art"
            onClick={(event) => {
              event.stopPropagation();
              saveLandingScroll();
            }}
          >
            <img src={ArtChange} className="ArtSpeech" />
          </Link>
        ) : (
          <p></p>
        )}
      </div>

      <Link to="/comic" onClick={saveLandingScroll}>
        <img src={comic} id="comicObject"></img>
      </Link>

      <div id="ModellingStallDiv" onClick={toggleModel}>
        <img src={ModellingStall} id="ModellingStall"></img>
        {ModelClicked ? (
          <Link
            to="/Modelling"
            onClick={(event) => {
              event.stopPropagation();
              saveLandingScroll();
            }}
          >
            <img src={ArtChange} className="ModelSpeech" />
          </Link>
        ) : (
          <p></p>
        )}
      </div>

      <div id="HammerDiv">
        <img
          src={HammerMachine}
          id="HammerMachine"
          onClick={toggleHammer}
        ></img>
        {HammerClicked ? (
          <Link to="/CodeSkills" onClick={saveLandingScroll}>
            <img src={ArtChange} className="HammerSpeech" />
          </Link>
        ) : (
          <ul></ul>
        )}
      </div>

      <div id="contactDiv">
        <img src={contactPost} id="contactPost"></img>

        <a href="mailto:keogh.sa@tuks.co.za" className="contactLinks">
          <img src={email} id="postEmail"></img>
        </a>

        <a href="https://github.com/u25245962-Keogh">
          <img src={github} id="postGithub"></img>
        </a>

        <a href="https://www.linkedin.com/in/shreya-keogh-43019a441">
          <img src={linkedin} id="postLinkedin"></img>
        </a>
      </div>
      <audio ref={walkingAudioRef} src="/walking.mp3" preload="auto" loop />
    </>
  );
}

export default Landing;
