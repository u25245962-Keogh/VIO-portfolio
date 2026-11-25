import { useEffect, useRef } from "react";
import Landing from "./pages/Landing"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Art from "./pages/Art";
import CodeSKills from "./pages/CodeSkills";
import Modelling from "./pages/Modelling";
import Comic from "./pages/Comic";
import Infographic from "./pages/Infographic";
import VerticalNar from "./pages/VerticalNar";
import PageLoadingBoundary from "./components/PageLoadingBoundary";

function SiteAudio() {
  const { pathname } = useLocation();
  const audioRef = useRef(null);
  const excludedPages = ["/infographic", "/verticalnar"];

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.06;

    const startPlayback = () => {
      audio.play().then(
        () => {
          window.removeEventListener("pointerdown", startPlayback);
          window.removeEventListener("keydown", startPlayback);
        },
        (error) => {
          if (error.name !== "NotAllowedError" && error.name !== "AbortError") {
            console.error("Could not play background music.", error);
          }
        },
      );
    };

    window.addEventListener("pointerdown", startPlayback);
    window.addEventListener("keydown", startPlayback);
    startPlayback();

    return () => {
      window.removeEventListener("pointerdown", startPlayback);
      window.removeEventListener("keydown", startPlayback);
    };
  }, [pathname]);

  if (excludedPages.includes(pathname.toLowerCase())) {
    return null;
  }

  return (
    <audio
      ref={audioRef}
      src="/music.mp3"
      autoPlay
      loop
    />
  );
}


function App() {
  

  return (
    <BrowserRouter>
      <SiteAudio />
      <PageLoadingBoundary>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/art" element={<Art />}></Route>
          <Route path="/CodeSkills" element={<CodeSKills />}></Route>
          <Route path="/Modelling" element={<Modelling />}></Route>
          <Route path="/Comic" element={<Comic />}></Route>
          <Route path="/Infographic" element={<Infographic />}></Route>
          <Route path="/VerticalNar" element={<VerticalNar />}></Route>
        </Routes>
      </PageLoadingBoundary>
    </BrowserRouter>
  );
}

export default App
