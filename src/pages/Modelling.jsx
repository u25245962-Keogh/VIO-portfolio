import head from "../assets/headLogo.png";
import Navbar from "../components/Navbar";
import DropdownMenu from "../components/DropdownMenu";
import NavItem from "../components/NavItem";
import { Model } from "/Keogh_nighttime";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useAnimations } from "@react-three/drei";
import "../styles/Model.css"
import background from "../assets/ModellingBackground.webp"
import { Link } from "react-router-dom";
function Modelling() {
  //const { actions, names } = useAnimations(animations, group);

  // useLayoutEffect(() => {
  //   names.forEach((animation) => {
  //     actions?.[animation]?.play();
  //   });
  // }, [actions, names]);

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

      <Canvas camera={{ fov: 64, position: [-2, 2, 0] }} id="Canvas">
        <ambientLight intensity={5} />
        <OrbitControls enableZoom={true} />
        <Model />
      </Canvas>
    </div>
  );
}

export default Modelling;
