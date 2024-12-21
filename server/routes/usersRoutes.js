import express from "express";
import {
  register,
  login,
  deleteUser,
  logout,
  addToLikedPosts,
  addCommentToPost,
  updateUserData,
  userposts,
} from "../controllers/userController.js";
import isLogin from "../middlewares/isLogin.js";

// Router
const router = express.Router();

// Register route as POST request
router.post("/register", register);

// Login route as POST request
router.post("/login", login);

// Login route as POST request
router.post("/logout", logout);

// Get User posts route as GET request
router.get("/user-posts", isLogin, userposts);

// Like a post as POST request
router.post("/add-to-like/:postId", isLogin, addToLikedPosts);

// Add comment to post as POST request
router.post("/add-comment/:postId", isLogin, addCommentToPost);

// Update user route as PUT request
router.put("/update/:id", updateUserData);

// Delete user route as DELETE request
router.delete("/delete/:id", deleteUser);

export default router;
