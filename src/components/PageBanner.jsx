import React from "react";
import logo from "../assets/logo-android-google-2-svgrepo-com.svg";
import "../styles/bannerstyle.css";

function PageBanner(props) {
  return (
    <div className="container">
      <div className="banner">
        {props.title}
        <img
          src={logo}
          width="30px"
          height="100%"
          alt="logo"
          className="logo"
        />
      </div>
    </div>
  );
}

export default PageBanner;
