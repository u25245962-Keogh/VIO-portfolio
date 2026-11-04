import navSpeech from "../assets/navSpeech.webp"
import { Link, useLocation } from "react-router-dom";

function DropdownItem({ link, state, image, children }) {
  return (
    <Link to={link} state={state} className="dropdownOption">
      <span className="dropdownItem-img">{image}</span>
      {children}
    </Link>
  );
}

function DropdownMenu() {
  const location = useLocation();

  return (
    <>
      <img src={navSpeech} id="navSpeech"></img>
      <div className="dropdown">

        <DropdownItem
          link="/"
          state={location.pathname === "/" ? undefined : { returnToLanding: true }}
        >
          home
        </DropdownItem>
        <DropdownItem link="/art">Art</DropdownItem>
        <DropdownItem link="/CodeSkills">Coding</DropdownItem>
        <DropdownItem link="/Modelling">3D</DropdownItem>
      </div>
    </>
  );
}

export default DropdownMenu