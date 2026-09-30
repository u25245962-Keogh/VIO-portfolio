import DropdownMenu from "./components/DropdownMenu";
import Navbar from "./components/navbar"
import NavItem from "./components/NavItem";
import Landing from "./pages/Landing"
import head from "./assets/headLogo.png";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Art from "./pages/Art";
import CodeSKills from "./pages/CodeSkills";
import Modelling from "./pages/Modelling";


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/art" element={<Art />}></Route>
        <Route path="/CodeSkills" element={<CodeSKills />}></Route>
        <Route path="/Modelling" element={<Modelling/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
