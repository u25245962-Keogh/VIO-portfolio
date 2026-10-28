import DropdownMenu from "./components/DropdownMenu";

import NavItem from "./components/NavItem";
import Landing from "./pages/Landing"
import head from "./assets/headLogo.png";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Art from "./pages/Art";
import CodeSKills from "./pages/CodeSkills";
import Modelling from "./pages/Modelling";
import PolaroidLineCarousel from "./components/PolaroidLineCarousel";
import Comic from "./pages/Comic";
import Infographic from "./pages/Infographic";
import VerticalNar from "./pages/VerticalNar";



function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/art" element={<Art />}></Route>
        <Route path="/CodeSkills" element={<CodeSKills />}></Route>
        <Route path="/Modelling" element={<Modelling />}></Route>
        <Route path="/Comic" element={<Comic />}></Route>
        <Route path="/Infographic" element={<Infographic />}></Route>
        <Route path="/VerticalNar" element={<VerticalNar />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
