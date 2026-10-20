import NavItem from "../components/NavItem";
import Navbar from "../components/Navbar";
import DropdownMenu from "../components/DropdownMenu";
import head from "../assets/headLogo.png";
//import silhouette from "../assets/silhouette.png"
import shreyaChar from "../assets/Shreya-Front.png";
import text from "../assets/textLogo.png";
import "../styles/Landing.css";
import "../styles/character.css";
import silhouette from "../assets/silhouette - Copy.png";
import { useEffect, useState } from "react";
import road from "../assets/road.png";
import spinShreya from "../assets/CharacterSpin.gif";
import HelloThere from "../assets/HelloThere.png";
import BIS from "../assets/BISmmStudent.png";
import intro1 from "../assets/intro1.png";
import intro2 from "../assets/intro2.png";
import intro3 from "../assets/intro3.png";
import intro4 from "../assets/intro4.png";
import intro5 from "../assets/intro5.png";
import shreyaWalking from "../assets/Shreya-Front.png";
import "../styles/Road.css";
import RoadDecorations from "../assets/RoadDecorations.png";
import ArtStall from "../assets/ArtStall.gif";
import ArtSpeech1 from "../assets/StallExcl.png"
import ArtSpeech2 from "../assets/StallElip.png";
import { Link } from "react-router-dom";
import Art from "./Art";



function Landing() {
  const [replaceSil, setReplaceSil] = useState(false);
  const [spin, setSpin] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [ArtClicked, setArtClicked] = useState(false);

  const [ArtChange, setArtChange] = useState(ArtSpeech1);

  window.addEventListener("scroll", () => {
    // Check if user has scrolled past 100px down the page
    if (window.scrollY > 850) {
      setReplaceSil(true); // New image path
    } else {
    }
  });

  function changeArtSpeech(){
    setArtChange(ArtSpeech2)
    console.log("asdasdaa")

  }

  function startSpin() {
    setSpin(true);
  }

  function setArtClicked1(){
    setArtClicked(!ArtClicked);
    console.log(ArtClicked)
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

              <div id="bubblesDiv">
                <img src={HelloThere} id="HelloThere" className="bubbles"></img>
                <img src={BIS} id="BIS" className="bubbles"></img>
                <img src={intro1} id="intro1" className="bubbles"></img>
                <img src={intro2} id="intro2" className="bubbles"></img>
                <img src={intro3} id="intro3" className="bubbles"></img>
                <img src={intro4} id="intro4" className="bubbles"></img>
                <img src={intro5} id="intro5" className="bubbles"></img>
              </div>
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
        </div>
      </div>
      {isWalking ? (
        <img src={shreyaWalking} id="shreyaOutside" />
      ) : (
        <p hidden>helo</p>
      )}

      <img src={road} id="road"></img>
   
      <div id="ArtStallDiv" onClick={setArtClicked1}>
        <img src={ArtStall} id="ArtStall"></img>
        {ArtClicked ? (
          <Link to="/art" onClick={(event) => event.stopPropagation()}>
            <img src={ArtChange} className="ArtSpeech" />
          </Link>
        ) : <p></p>}
      </div>
    </>
  );
}

export default Landing;
