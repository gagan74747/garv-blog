import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import "../CreatePost/CreatePost.css";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  email: "",
  title: "",
  desc: "",
  img: "",
  image: "",
};

function UpdatePost() {
  const navigate = useNavigate();
  const params = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  if (user !== null) {
    initialValues.name = user.name;
    initialValues.email = user.email;
    initialValues.img = user.userImage;
  }

  useEffect(() => {
    setLoader(true);
    try {
      const getdata = async () => {
        const res = await axios.get(
          `http://localhost:8080/api/post/${params.id}`,
          {
            withCredentials: true,
          },
        );
        setPost(res.data);
      };
      getdata();
    } catch (e) {
      console.log("Error : ", e);
    } finally {
      setLoader(false);
    }
  }, []);

  const [post, setPost] = useState(initialValues);
  const [loader, setLoader] = useState(false);

  const url = post.image
    ? post.image.url
    : "https://user-images.githubusercontent.com/43302778/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg";

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
    try {
      await axios.put(`http://localhost:8080/api/update/${params.id}`, post, {
        withCredentials: true,
      });
      navigate("/");
      toast.success("Post Updated Succesfully!");
    } catch (error) {
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.message === "Access Denied"
      ) {
        toast.error("Access Denied. Can't update other user's post!");
      } else {
        console.error("Update request failed:", error);
      }
    }
  };

  return (
    <div>
      {loader ? (
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
              <img src={url} className="default_img" alt="Uploaded Image" />
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
                        Update
                      </p>
                    ) : (
                      <p
                        style={{
                          color: " white",
                          fontWeight: "700",
                          marginTop: "20px",
                        }}
                      >
                        Update
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
                value={post.title}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="desc"
                value={post.desc}
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

export default UpdatePost;
