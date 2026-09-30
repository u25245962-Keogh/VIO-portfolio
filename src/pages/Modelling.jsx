import head from "../assets/headLogo.png";
import Navbar from "../components/navbar";
import DropdownMenu from "../components/DropdownMenu";
import NavItem from "../components/NavItem";
function Modelling() {
  return (
    <>
      <Navbar>
        <NavItem icon={head}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
      <p>3D modelling page</p>
    </>
  );
}

export default Modelling;
