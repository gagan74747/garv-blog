import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import "./App.css";
//pages

import Home from "./pages/Home/Home";
import CreatePost from "./pages/CreatePost/CreatePost";
import UpdatePost from "./pages/UpdatePost/UpdatePost";

import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AllPost from "./pages/AllPost/AllPost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [render, setRender] = useState(false);

  return (
    <div className="app">
      <Router>
        <Navbar setRender={setRender} />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home render={render} />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/update/:id" element={<UpdatePost />} />
          <Route path="/allposts/:id" element={<AllPost />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
