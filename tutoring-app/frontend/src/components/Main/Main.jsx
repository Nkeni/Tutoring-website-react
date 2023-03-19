import "./Main.scss";
import { Routes, Route } from "react-router-dom";
import Home from "../../MainComponent/Home/Home.jsx";
import StudentRegister from "../../MainComponent/StudentRegister/StudentRegister.jsx";
import About from "../../MainComponent/About/About.jsx";

function Main() {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register">
          <Route index element={<StudentRegister />} />
        </Route>
        <Route path="/about" element={<About />} />
        {/* <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<Navigate to="/" />} /> */}
      </Routes>
    </div>
  );
}

export default Main;
