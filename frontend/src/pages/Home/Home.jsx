import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Banner from "../../components/banner/banner";
import "./Home.css";
import Post from "../../components/Post/OnePost";
import { populatePosts } from "../../actions";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useSelector, useDispatch } from "react-redux";

/* eslint-disable react/prop-types */
function Home({ render }) {
  const [changed, setChanged] = useState(false);
  const [sort, setSort] = React.useState("");
  const pageRef = useRef(1);
  const user = JSON.parse(localStorage.getItem("user"));
  const [prevData, setPrevData] = useState([]);
  const posts = useSelector((state) => state.rootReducer.posts);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isScroll, setIsScroll] = useState(true);
  const dispatch = useDispatch();

  const compareDates = (a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;
    return 0;
  };

  const getPost = async () => {
    if (isScroll) {
      setLoading(true);
    }
    try {
      const result = await axios.get("https://garv-blog.onrender.com/api/posts", {
        params: { page: pageRef.current },
        withCredentials: true,
      });
      let sortedData = [...result.data];
      dispatch(populatePosts([...prevData, ...sortedData]));
      setPrevData([...prevData, ...sortedData]);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("user");
        window.location.reload();
      }
      console.error("Error fetching or sorting data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    getPost();
  }, [changed, render]);

  useEffect(() => {
    if (sort === "OTN") {
      posts.sort((a, b) => compareDates(a, b));
    } else if (sort === "NTO") {
      posts.sort((a, b) => compareDates(b, a));
    }
    setPost(posts);
  }, [posts, sort]);

  useEffect(() => {
    setIsScroll(false);
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        pageRef.current += 1;
        getPost();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevData]);

  return (
    <div>
      {user == null ? (
        <div
          style={{
            marginTop: "300px",
            marginLeft: "450px",
            fontSize: "40px",
            fontFamily: "Times New Roman",
          }}
        >
          <h1>Login to Access Content</h1>
        </div>
      ) : (
        <div>
          {loading ? (
            <div className="loader-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div style={{ backgroundColor: "rgb(223,223,223)" }}>
              <Banner />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to="/createpost">
                  <button style={{ cursor: "pointer" }} className="btn1">
                    Create Post
                  </button>
                </Link>
                <Box sx={{ minWidth: 120 }} className="dropdown">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sort}
                      label="Sort"
                      onChange={handleChange}
                    >
                      <MenuItem value={"NTO"}>Newest to Oldest</MenuItem>
                      <MenuItem value={"OTN"}>Oldest to Newest</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className="container1">
                {post?.map((post) => {
                  return (
                    <Post
                      key={post._id}
                      id={post._id}
                      name={post.name}
                      title={post.title}
                      image={post.image.url}
                      img={post.img}
                      desc={post.desc}
                      createdAt={post.created_at}
                      setChanged={setChanged}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
