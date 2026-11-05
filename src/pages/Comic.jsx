import { Link } from "react-router-dom";
import head from "../assets/headLogo.png";
import learnMore from "../assets/learnMore.png"
import Navbar from "../components/Navbar";
import DropdownMenu from "../components/DropdownMenu";
import NavItem from "../components/NavItem";
import ComicBook from "../components/ComicBook";
import "../styles/Comic.css";

import "../styles/font.css";
import { useState } from "react";
function Comic() {
  const [hasReachedLastPage, setHasReachedLastPage] = useState(false);

  return (
    <div id="comic-page">
      <Link to="/" state={{ fromComic: true }}>
        <button type="button" id="ModelBack">
          Back
        </button>
      </Link>
      <Navbar>
        <NavItem icon={head}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
      <p id="myComicP">My Comic book I created in first year!</p>

      <Link
        to="/infographic"
        aria-label="Go to the Infographic page"
        id="infographic-btn"
        style={{
          zIndex: hasReachedLastPage ? 1 : 2,
          visibility: hasReachedLastPage ? "visible" : "hidden",
        }}
      >
        <button type="button" id="infographic-btnn">
          <img alt="Infographic" src={learnMore} width="270" />
        </button>
      </Link>

      <ComicBook onLastPageChange={setHasReachedLastPage}></ComicBook>
    </div>
  );
}

export default Comic;
