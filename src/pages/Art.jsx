
import head from "../assets/headLogo.png";
import Navbar from "../components/Navbar";
import DropdownMenu from "../components/DropdownMenu";
import NavItem from "../components/NavItem";
import { Link } from "react-router-dom";
import PolaroidLineCarousel from "../components/PolaroidLineCarousel";
import "../styles/Art.css"
import background from "../assets/ArtBackground.jpeg"

import "../styles/font.css"
function Art() {
  return (
    <div id="ArtPage" style={{ backgroundImage: `url(${background})` }}>
      <Navbar>
        <NavItem icon={head}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
      <Link to="/" state={{ fromArt: true }}>
        <button type="button" id="ArtBack">
          Back
        </button>
      </Link>
  

      <PolaroidLineCarousel
        slides={[
          {
            image: "/Bam.jpeg",
            title: "Crash",
            caption: "",
          },
          {
            image: "/boom.jpeg",
            title: "Boom",
            caption: "",
          },
          {
            image: "/Krak.jpeg",
            title: "Bam",
            caption: "",
          },
          {
            image: "/Pow.jpeg",
            title: "Krak",
            caption: "",
          },
          {
            image: "/Joker.jpeg",
            title: "Joker illustration",
            caption: "",
          },
          {
            image: "/Flash.jpeg",
            title: "The Flash and Captain Cold",
            caption: "",
          },
          {
            image: "/Orchids.jpeg",
            title: "Orchids Lino",
            caption: "",
          },
          {
            image: "/sunflowers.jpeg",
            title: "Sunflowers",
            caption: "",
          },
          {
            image: "/stillLife1.jpeg",
            title: "Still life",
            caption: "",
          },
          {
            image: "/stillLife2.jpeg",
            title: "Another Still life",
            caption: "",
          },
        ]}
      />
    </div>
  );
}

export default Art;
