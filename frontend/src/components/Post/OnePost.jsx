import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import "../../pages/Home/Home.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const OnePost = ({
  id,
  name,
  title,
  image,
  img,
  desc,
  createdAt,
  setChanged,
}) => {
  const navigate = useNavigate();
  const post = useSelector((state) => state.rootReducer.posts);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/delete/${id}`, {
        withCredentials: true,
      });
    window.location.reload()
      toast.success("Post Deleted Successfully");
    } catch (error) {
      if (
        error.response &&
        error.response.status == 404 &&
        error.response.data.message == "Access Denied"
      ) {
        toast.error("Access Denied: Can't delete other user's post!");
      } else {
        console.error("Delete request failed:", error);
      }
    }
  };

  return (
    <div>
      <div className="item" key={id}>
        <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
          <div style={{ cursor: "pointer", marginRight: "10px" }}>
            <Avatar
              onClick={() => {
                navigate(`/allposts/${id}`);
              }}
              alt="user Image"
              src={img}
            />
          </div>
          <div className="post_title">
            <b>{title}</b>
            {moment(createdAt).format("lll")} by : {name}
          </div>
          <div>
            {
              // post?.find(d => d._id === id)?.email == JSON.parse(localStorage.getItem('user'))?.email &&
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            }

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <div style={{ display: "flex" }}>
                <div>
                  <MenuItem
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                    }}
                    onClick={() => deletePost(id)}
                  >
                    <MdDelete
                      style={{
                        color: "rgb(255,74,74)",
                      }}
                    />
                  </MenuItem>
                </div>
                <div style={{ fontSize: "20px" }}>|</div>
                <div>
                  <Link to={`/update/${id}`}>
                    <MenuItem
                      style={{
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      }}
                    >
                      <MdEdit style={{ color: "rgb(25,118,210)" }} />
                    </MenuItem>
                  </Link>
                </div>
              </div>
            </Menu>
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
            src={image}
            alt="Post Image"
          />
        </div>
        <hr />
        <div style={{ overflowWrap: "anywhere", padding: "8px" }}>{desc}</div>
      </div>
    </div>
  );
};

export default OnePost;
