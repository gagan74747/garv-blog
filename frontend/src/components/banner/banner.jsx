import React from "react";
import poster from "./poster.jpg";
import logo from "./ttn-logo.png";
import "./banner.css";

function banner() {
  return (
    <div className="container">
      <img className="poster" src={poster} alt="TTN Banner" />
      <div className="center">
        <img src={logo} alt="logo" width="80px" />
        <div className="text">TTN | Blogs</div>
      </div>
    </div>
  );
}

export default banner;
