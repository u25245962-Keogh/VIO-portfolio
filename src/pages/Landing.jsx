
import NavItem from "../components/NavItem";
import Navbar from "../components/navbar";
import DropdownMenu from "../components/DropdownMenu";
import head from "../assets/headLogo.png"
import silhouette from "../assets/silhouette.png"
import shreyaChar from "../assets/Shreya-Front.png";
import text from "../assets/textLogo.png"
import "../styles/Landing.css"
import silhouetteCopy from "../assets/silhouette - Copy.png"
import { useEffect, useState } from "react";
import road from "../assets/road.png"




function Landing() {
 
  const [replaceSil, setReplaceSil] = useState(false);

  window.addEventListener("scroll", () => {
    
    // Check if user has scrolled past 100px down the page
    if (window.scrollY > 850) {
      setReplaceSil(true); // New image path
    } else {
      setReplaceSil(false); // Revert back to original image
    }
  });
 

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
          ) : (
            <img src={shreyaChar} id="shreyaChar" />
          )}
        </div>
      </div>
      <img src={road} id="road"></img>
    </>
  );

 
}

export default Landing;
