import navSpeech from "../assets/navSpeech.png"
function DropdownMenu() {
    
    function DropdownItem(props) {
      return (
          <a href={props.link} className="dropdownOption">
              <span className="dropdownItem-img">{props.image}</span>
          {props.children}
        </a>
      );
    }

  return (
    <>
      <img src={navSpeech} id="navSpeech"></img>
      <div className="dropdown">

        <DropdownItem link="/">home</DropdownItem>
        <DropdownItem link="/art">Art</DropdownItem>
        <DropdownItem link="/CodeSKills">Coding</DropdownItem>
        <DropdownItem link="/Modelling">3D</DropdownItem>
      </div>
    </>
  );
}

export default DropdownMenu