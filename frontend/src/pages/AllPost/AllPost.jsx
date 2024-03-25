import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import Avatar from "@mui/material/Avatar";

function AllPost() {
  const params = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState();
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://garv-blog.onrender.com/api/getuser/${params.id}`,
        {
          withCredentials: true,
        },
      );
      setData(response.data);
      setUserImg(response.data[0].img);
      setUserName(response.data[0].name);
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div
          style={{
            height: "94%",
            backgroundColor: "rgb(223,223,223)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "0px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{ height: "15vh", width: "8vw", marginTop: "20px" }}
              alt="user Image"
              src={userImg}
            />
            <p
              style={{
                fontSize: "50px",
                border: "dotted",
                borderRadius: "10px",
                margin: "10px",
              }}
            >
              All Posts by :{" "}
              <b style={{ fontFamily: "monospace" }}>{userName}</b>
            </p>
          </div>
          <div className="container1">
            {data.map((posts) => {
              return (
                <div className="item" key={posts._id}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ cursor: "pointer" }}>
                      <Avatar alt="user Image" src={posts.img} />
                    </div>
                    <div className="post_title">
                      <b>{posts.title}</b>
                      {moment(posts.created_at).format("lll")} by : {posts.name}
                    </div>
                  </div>
                  <hr
                    style={{
                      border: "0.5px solid grey ",
                      width: "100%",
                    }}
                  />
                  <div>
                    <img
                      style={{ width: "100%", height: "200px" }}
                      src={posts.image.url}
                      alt="Post Image"
                    />
                  </div>
                  <div style={{ overflowWrap: "anywhere" }}>{posts.desc}</div>
                </div>
              );
            })}
          </div>
          <div>
            <button
              className="btn_home"
              onClick={() => {
                navigate("/");
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllPost;
