import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./ttn-logo-name.png";
import Avatar from "@mui/material/Avatar";
import "./navbar.css";
import Login from "../../pages/Login/Login";

function Navbar({ setRender }) {
  const navigate = useNavigate();
  const userDetails = {
    name: "",
    img: "",
  };

  var user = JSON.parse(localStorage.getItem("user"));
  if (user !== null) {
    userDetails.name = user.name;
    userDetails.img = user.userImage;
  }

  const logout = () => {
    localStorage.clear();
    setRender((p) => !p);
    navigate("/");
  };

  return (
    <div className="navbar">
      <div>
        <img className="logo" src={logo} alt="TTN Logo" />
      </div>
      <div>
        <p className="heading">TTN BLOGS</p>
      </div>
      <div style={{ display: "flex", padding: "10px" }}>
        <div>
          {user ? (
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", padding: "10px" }}>
                <div>
                  <Avatar alt="user Image" src={userDetails.img} />
                </div>
                <div style={{ padding: "10px" }}>
                  {" "}
                  Hi <b>{userDetails.name}</b>
                </div>
              </div>
              <div onClick={logout}>
                <button className="btn">Logout</button>
              </div>
            </div>
          ) : (
            <div>
              <Login setRender={setRender} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
