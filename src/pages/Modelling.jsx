import head from "../assets/headLogo.png";
import Navbar from "../components/Navbar";
import DropdownMenu from "../components/DropdownMenu";
import NavItem from "../components/NavItem";
import { Model } from "/Keogh_nighttime";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "../styles/Model.css";
import background from "../assets/ModellingBackground.webp";
import { Link } from "react-router-dom";

// Swap these for your real photos
import photo1 from "../assets/zoom2.png";
import photo2 from "../assets/view1.png";
import photo3 from "../assets/view2.png";
import photo4 from "../assets/zoom3.png";

const photos = [photo1, photo2, photo3, photo4];

function Modelling() {
  return (
    <div id="ModellingPage" style={{ backgroundImage: `url(${background})` }}>
      <Link to="/" state={{ fromModelling: true }}>
        <button type="button" id="ModelBack">
          Back
        </button>
      </Link>
      <Navbar>
        <NavItem icon={head}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>

      <div id="ModellingContent">
        <section id="ModellingInfo">
          <h1 id="modelImade">An isometric room I modelled in Blender</h1>
          <div id="PhotoGrid">
            {photos.map((src, i) => (
              <img key={i} src={src} alt={`Model photo ${i + 1}`} />
            ))}
          </div>
        </section>

        <div id="ModelViewer">
          <Canvas camera={{ fov: 64, position: [-2, 2, 0] }}>
            <ambientLight intensity={1.5} color="#ffffff" />
            <directionalLight position={[5, 5, 5]} intensity={2} />
           
            <OrbitControls enableZoom={true} />
            <Model />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default Modelling;
