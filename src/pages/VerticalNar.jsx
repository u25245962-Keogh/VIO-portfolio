import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import head from "../assets/headLogo.png";
import DropdownMenu from "../components/DropdownMenu";
import NavItem from "../components/NavItem";

function VerticalNar() {
  return (
    <>
      <Navbar>
        <NavItem icon={head}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
      <Link
        to="/Infographic"
        style={{
          position: "fixed",
          left: "25px",
          top: "25px",
          zIndex: 2,
        }}
      >
        <button type="button" className="modelBackButton">
          Back
        </button>
      </Link>
    </>
  );
}

export default VerticalNar;
