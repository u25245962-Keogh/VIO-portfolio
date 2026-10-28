
import head from "../assets/headLogo.png";
import Navbar from "../components/Navbar";
import DropdownMenu from "../components/DropdownMenu";
import NavItem from "../components/NavItem";
import { Link } from "react-router-dom";
import PolaroidLineCarousel from "../components/PolaroidLineCarousel";
import "../styles/Art.css"
import background from "../assets/ArtBackground.webp"

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
            image: "/Bam.webp",
            title: "Crash",
            caption: "",
          },
          {
            image: "/boom.webp",
            title: "Boom",
            caption: "",
          },
          {
            image: "/Krak.webp",
            title: "Bam",
            caption: "",
          },
          {
            image: "/Pow.webp",
            title: "Krak",
            caption: "",
          },
          {
            image: "/Joker.webp",
            title: "Joker illustration",
            caption: "",
          },
          {
            image: "/Flash.webp",
            title: "The Flash and Captain Cold",
            caption: "",
          },
          {
            image: "/Orchids.webp",
            title: "Orchids Lino",
            caption: "",
          },
          {
            image: "/sunflowers.webp",
            title: "Sunflowers",
            caption: "",
          },
          {
            image: "/stillLife1.webp",
            title: "Still life",
            caption: "",
          },
          {
            image: "/stillLife2.webp",
            title: "Another Still life",
            caption: "",
          },
        ]}
      />
    </div>
  );
}

export default Art;
