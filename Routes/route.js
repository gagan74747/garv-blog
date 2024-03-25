import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePost
} from "../Controller/postController.js";
import { createUser, getUser } from "../Controller/userController.js";
import { authentication, authorization } from "../middlewares/authMiddlewars.js";

const router = express.Router();

router.post("/createpost",authentication, createPost);
router.get("/posts",authentication, getAllPost);
router.get("/post/:id",authentication, getPost);
router.put("/update/:id",authentication, authorization, updatePost);
router.delete("/delete/:id",authentication, authorization, deletePost);
router.post("/create", createUser);
router.get("/getuser/:id",authentication, getUser); 

export default router;
