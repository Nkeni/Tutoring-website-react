import React from "react";
import "./Footer.scss";
import { FaLinkedinIn } from "react-icons/fa";
import { FaResearchgate } from "react-icons/fa";

function Footer() {
  return (
    <div className="Footer">
      <div>
        Koksche str31 <br />
        49080 Osnabrück <br />
        Germany
      </div>
      <div>
        <p>&copy; AllRights reserved</p>
      </div>
      <div className="social">
        <a
          href="https://www.linkedin.com/in/bob-kyeyune-a37263137/?originalSubdomain=de"
          target="blank"
        >
          <FaLinkedinIn className="linkedin" />
        </a>

        <a
          href="https://www.researchgate.net/profile/Bob-Kyeyune"
          target="blank"
        >
          <FaResearchgate className="research-gate" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
