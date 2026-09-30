
import head from "../assets/headLogo.png";
import Navbar from "../components/navbar";
import DropdownMenu from "../components/DropdownMenu";
import NavItem from "../components/NavItem";

import "../styles/font.css"
function Art() {
  return (
    <>
      <Navbar>
        <NavItem icon={head}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
      <p>drawings page</p>
    </>
  );
}

export default Art;
