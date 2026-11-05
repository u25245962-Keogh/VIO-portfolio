import head from "../assets/headLogo.png";
import Navbar from "../components/Navbar";
import DropdownMenu from "../components/DropdownMenu";
import NavItem from "../components/NavItem";
import background from "../assets/HammerBackground.jpeg";
import "../styles/CodeSkills.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import H90 from "../assets/Hammer90.gif";
import H80 from "../assets/Hammer80.gif";
import H70 from "../assets/Hammer70.gif";
import H60 from "../assets/hammer60.gif";
import LeftHammer from "../assets/LeftHammer.png";
import RightHammer from "../assets/RightHammer.png";
import "../styles/Skills.css";
import HTMLCSS from "../assets/HTML-CSS.png"
import CPP from "../assets/cpp.png";
import React from "../assets/React.png";
import SQL from "../assets/SQL.png";
import Vue from "../assets/Vue.png";
import Java from "../assets/Java.png"




const skills = [
  { name: "HTML & CSS", image: H90, preview: HTMLCSS },
  { name: "C++", image: H70, preview: CPP },
  { name: "React", image: H80, preview: React },
  { name: "SQL", image: H70, preview: SQL },
  { name: "Vue", image: H80, preview: Vue },
  { name: "Java", image: H60, preview: Java },
];

function CodeSKills() {
  const [skillIndex, setSkillIndex] = useState(0);
  const hammerAudioRef = useRef(null);
  const skill = skills[skillIndex];

  function changeSkill(direction) {
    setSkillIndex((index) =>
      Math.max(0, Math.min(index + direction, skills.length - 1)),
    );

    const hammerAudio = hammerAudioRef.current;
    if (hammerAudio) {
      hammerAudio.currentTime = 0;
      hammerAudio.play().catch((error) => {
        console.error("Unable to play hammer audio:", error);
      });
    }
  }

  return (
    <div id="CodeSkillsPage" style={{ backgroundImage: `url(${background})` }}>
      <audio ref={hammerAudioRef} src="/hammer.wav" preload="auto" />
      <Navbar>
        <NavItem icon={head}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
      <header className="SkillsHeader">
        <div className="mySkills">
          <h1 className="my">My</h1>
          <h1 className="skills">Skills</h1>
        </div>

        <Link to="/" state={{ returnToLanding: true }}>
          <button type="button" id="CodeSkillsBack">
            Back
          </button>
        </Link>
      </header>
      <div className="SkillsCarousel">
        <img
          src={skill.preview}
          className="SkillPreview"
          alt={`${skill.name} preview`}
        />
        <h2 className="skillName">{skill.name }</h2>
        <button
          type="button"
          className="SkillsArrow SkillsArrowPrevious"
          aria-label="Previous skill"
          onClick={() => changeSkill(-1)}
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
          onClick={() => changeSkill(1)}
          disabled={skillIndex === skills.length - 1}
        >
          <img src={RightHammer} alt="" className="HammerArrow" />
        </button>
      </div>
    </div>
  );
}

export default CodeSKills;
