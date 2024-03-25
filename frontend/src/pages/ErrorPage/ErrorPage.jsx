import React from "react";
import Loader from "react-js-loader";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="error-container">
        <div className="err_box">
          <div>
            <img
              src="https://media1.giphy.com/media/8L0Pky6C83SzkzU55a/200w.webp?cid=ecf05e470q9q6akt59e3wjkw7fepj4275yu8wtlo5frn4rve&rid=200w.webp&ct=g"
              alt="pic"
            />
          </div>
          <div>
            <h1 style={{ color: "grey" }}>O0ps, Error :404</h1>
            <h2 style={{ color: "grey", marginLeft: "55px" }}>
              Page Not Found
            </h2>
          </div>
          <div>
            <Loader
              type="box-rectangular"
              bgColor={"#9c1f62"}
              color={"#FFFFFF"}
              size={50}
            />
          </div>
          <div>
            <button className="err_btn" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
