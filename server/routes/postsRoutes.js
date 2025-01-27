import express from "express";
import {
  createpost,
  deletepost,
  getAllPosts,
  getPostData,
  updatepost,
} from "../controllers/postController.js";
import isLogin from "../middlewares/isLogin.js";
import upload from "../storage/multerconfig.js";

// Router
const router = express.Router();

//Get all posts
router.get("/get-all-posts", getAllPosts);

// Get the blog data to read the blog
router.get("/view-post/:id", getPostData);

// Create Blog route as POST request
router.post("/create-post", isLogin, upload.single("file"), createpost);

// Update Blog route as PUT request
router.put("/update-post/:id", isLogin, updatepost);

// Delete Blog route as DELETE request
router.delete("/delete-post/:id", isLogin, deletepost);

export default router;
