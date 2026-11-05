
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
      <Link to="/" state={{ returnToLanding: true }}>
        <button type="button" id="ArtBack">
          Back
        </button>
      </Link>
  

      <PolaroidLineCarousel
        slides={[
          {
            image: "/Bam.webp",
            title: "Crash",
            caption: "2024",
          },
          {
            image: "/boom.webp",
            title: "Boom",
            caption: "2024",
          },
          {
            image: "/Krak.webp",
            title: "Bam",
            caption: "2024",
          },
          {
            image: "/Pow.webp",
            title: "Krak",
            caption: "2024",
          },
          {
            image: "/Joker.webp",
            title: "Joker illustration",
            caption: "2024",
          },
          {
            image: "/Flash.webp",
            title: "The Flash and Captain Cold",
            caption: "2023",
          },
          {
            image: "/Orchids.webp",
            title: "Orchids Lino",
            caption: "2024",
          },
          {
            image: "/sunflowers.webp",
            title: "Sunflowers",
            caption: "2023",
          },
          {
            image: "/stillLife1.webp",
            title: "Still life",
            caption: "2024",
          },
          {
            image: "/stillLife2.webp",
            title: "Another Still life",
            caption: "2025",
          },
        ]}
      />
    </div>
  );
}

export default Art;
