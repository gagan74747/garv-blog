// import React, { useState, useContext, useEffect } from "react";
import React from "react";
import "../../firebase_config";
import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Login({ setRender }) {
  const navigate = useNavigate();
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        name: user.displayName,
        email: user.email,
        userImage: user.photoURL,
        google: true,
        moderator: false,
        password: "*#*#)@*!%@",
      };

      try {
        await axios.post("https://garv-blog.onrender.com/api/create", userData, {
          withCredentials: true, // Include credentials (cookies) with the request
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }

      localStorage.setItem("user", JSON.stringify(userData));
      setRender((p) => !p);
      navigate("/");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`Error ${error}`);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <button
          className="btn1"
          style={{ cursor: "pointer" }}
          onClick={loginWithGoogle}
        >
          Google Login
        </button>
      </div>
    </div>
  );
}

export default Login;
