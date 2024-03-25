import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import default_image from "./default_image.jpg";
import "./CreatePost.css";

const initialValues = {
  name: "",
  email: "",
  title: "",
  desc: "",
  img: "",
  image: "",
};

function CreatePost() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user !== null) {
    initialValues.name = user.name;
    initialValues.email = user.email;
    initialValues.img = user.userImage;
  }

  const [post, setPost] = useState(initialValues);
  // eslint-disable-next-line no-unused-vars

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPost((prev) => ({ ...prev, ["image"]: reader.result }));
    };
  };

  const submitForm = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/createpost",
        post,
        {
          withCredentials: true, // Include cookies with the request
        },
      );
      console.log(res);
      navigate("/");
    } catch (e) {
      console.log("Error : ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="box">
          <div className="page">
            <div
              style={{
                display: "flex",
                flexDirection: " column",
                alignItems: "center",
              }}
            >
              <img
                src={default_image}
                className="default_img"
                alt="Default Image"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "100",
                }}
              >
                <div
                  style={{
                    display: "flex ",
                    padding: "0px 20px",
                    borderRadius: "10px",
                    backgroundColor: "rgb(40,167,69)",
                  }}
                >
                  <div style={{ padding: "10px 0px" }}>
                    <IconButton component="label">
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        style={{ cursor: "pointer" }}
                        onChange={(e) => previewFile(e.target.files[0])}
                      />
                      <PhotoCamera sx={{ color: "white" }} fontSize="medium" />
                    </IconButton>
                  </div>
                  <div style={{ margin: "0px" }}>
                    {post.image ? (
                      <p
                        style={{
                          color: " white",
                          fontWeight: "700",
                          marginTop: "20px",
                        }}
                      >
                        Uploaded
                      </p>
                    ) : (
                      <p
                        style={{
                          color: " white",
                          fontWeight: "700",
                          marginTop: "20px",
                        }}
                      >
                        Upload
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", margin: 10 }}
            >
              <TextField
                style={{ marginBottom: "10px" }}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                name="title"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="desc"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                className="btn_home"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back to Home
              </button>
              <button className="btn_submit" onClick={submitForm}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
