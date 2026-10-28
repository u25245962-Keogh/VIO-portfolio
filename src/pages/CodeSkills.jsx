import head from "../assets/headLogo.png";
import Navbar from "../components/Navbar";
import DropdownMenu from "../components/DropdownMenu";
import NavItem from "../components/NavItem";
import background from "../assets/HammerBackground.jpeg";
import "../styles/CodeSkills.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import H90 from "../assets/Hammer90.png";
import H80 from "../assets/Hammer80.png";
import H70 from "../assets/Hammer70.png";
import H60 from "../assets/Hammer60.png";
import LeftHammer from "../assets/LeftHammer.png";
import RightHammer from "../assets/RightHammer.png";
import "../styles/Skills.css";
import HTMLCSS from "../assets/HTML-CSS.png"
import CPP from "../assets/cpp.webp";
import React from "../assets/React.webp";
import SQL from "../assets/SQL.jpg";
import Vue from "../assets/Vue.webp";
import Java from "../assets/Java.webp"




const skills = [
  { name: "HTML5 and CSS", image: H90, preview: HTMLCSS },
  { name: "C++", image: H70, preview: CPP },
  { name: "React", image: H80, preview: React },
  { name: "SQL", image: H70, preview: SQL },
  { name: "Vue", image: H80, preview: Vue },
  { name: "Java", image: H60, preview: Java },
];

function CodeSKills() {
  const [skillIndex, setSkillIndex] = useState(0);
  const skill = skills[skillIndex];

  return (
    <div id="CodeSkillsPage" style={{ backgroundImage: `url(${background})` }}>
      <Navbar>
        <NavItem icon={head}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
      <header className="SkillsHeader">
        <Link to="/">
          <button type="button" id="CodeSkillsBack">
            Back
          </button>
        </Link>
        <h1>My Skills!</h1>
      </header>
      <div className="SkillsCarousel">
        <img
          src={skill.preview}
          className="SkillPreview"
          alt={`${skill.name} preview`}
        />
        <button
          type="button"
          className="SkillsArrow SkillsArrowPrevious"
          aria-label="Previous skill"
          onClick={() => setSkillIndex((index) => Math.max(index - 1, 0))}
          disabled={skillIndex === 0}
        >
          <img src={LeftHammer} alt="" className="HammerArrow" />
        </button>
        <div className="SkillsSlide">
          <img
            src={skill.image}
            height={999}
            className="Bar"
            alt={`${skill.name} skill level`}
          />
        </div>
        <button
          type="button"
          className="SkillsArrow SkillsArrowNext"
          aria-label="Next skill"
          onClick={() =>
            setSkillIndex((index) => Math.min(index + 1, skills.length - 1))
          }
          disabled={skillIndex === skills.length - 1}
        >
          <img src={RightHammer} alt="" className="HammerArrow" />
        </button>
      </div>
    </div>
  );
}

export default CodeSKills;
