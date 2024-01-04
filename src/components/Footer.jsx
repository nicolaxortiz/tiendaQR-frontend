import React from "react";
import "../styles/footerstyle.css";
import githubLogo from "../assets/github-142-svgrepo-com.svg";
import instagramLogo from "../assets/instagram-svgrepo-com.svg";

function Footer() {
  const handleNavigation = (option) => {
    if (option === "github") {
      window.location.href = "https://github.com/nicolaxortiz";
    } else {
      window.location.href = "https://www.instagram.com/nicolaxortiz/";
    }
  };

  return (
    <div className="footer">
      <div className="txt-footer">
        Developed by: Nicolas Santiago Ortiz Pedraza
      </div>
      <div className="social-footer">
        <img
          src={githubLogo}
          alt=""
          className="icon-media-footer"
          onClick={() => handleNavigation("github")}
        />
        <img
          src={instagramLogo}
          alt=""
          className="icon-media-footer"
          onClick={() => handleNavigation("instagram")}
        />
      </div>
    </div>
  );
}

export default Footer;
