import { Link } from "react-router-dom";
import head from "../assets/headLogo.png";
import "../styles/nav.css"

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
       {props.children}
     </ul>
    </nav>
  );
}
export default Navbar;

{
  /** <img src={head} id="navHead"></img> */
}