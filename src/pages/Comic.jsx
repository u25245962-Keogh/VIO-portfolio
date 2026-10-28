import { Link } from "react-router-dom";
import head from "../assets/headLogo.png";
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
    <>
      <Link to="/" state={{ fromModelling: true }}>
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
          <img alt="Infographic" src={head} width="220" />
        </button>
      </Link>

      <ComicBook onLastPageChange={setHasReachedLastPage}></ComicBook>
    </>
  );
}

export default Comic;
