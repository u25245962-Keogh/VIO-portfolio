import { useState } from "react";

function NavItem(props) {
    const [open, setOpen] = useState(false);
  return (
    <li className="navItem">
      <a className="icon" onClick={()=> setOpen(!open)}>
       <img src={props.icon}id="navHead"></img> 
          </a>
          {open && props.children}
    </li>
  );
}

export default NavItem;
