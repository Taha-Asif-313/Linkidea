import User from "../models/Usermodel.js";
import PostModel from "../models/Postmodel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/tokenGenerator.js";
import { tokenRemover } from "../utils/tokenRemover.js";

// Register User
export const register = async (req, res) => {
  try {
    // Get data from user
    const { fullname, username, email, gender, password, confirmPassword } =
      req.body;

    // Check if username exist or not
    const isUsername = await User.findOne({ username: username });
    if (isUsername) {
      return res.status(400).json({
        success: false,
        message: "Try different username!",
      });
    }

    // Check if email exist or not
    const isEmail = await User.findOne({ email: email });
    if (isEmail) {
      return res.status(400).json({
        success: false,
        message: "Try another email!",
      });
    }

    // Check password and confirmPassword same or different
    if (password !== confirmPassword) {
      return res.status(404).json({
        success: false,
        message: "Password did not matched!",
      });
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save User
    const user = new User({
      fullname,
      username,
      email,
      gender,
      password: hashedPassword,
      profilePic: "https://avatar.iran.liara.run/public/boy",
    });
    await user.save();

    // JWT Token
    generateToken(user._id, res);

    // Response
    return res.status(201).json({
      success: true,
      message: "Registered Successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    // Get data
    const { email, password } = req.body;

    // Find User by email or username
    const user = await User.findOne({ email: email });

    // Email matching
    if (!user) {
      return res.json({
        success: false,
        message: "invalid candidate!",
      });
    }

    // Password Matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "invalid candidate!",
      });
    }

    // JWT Token
    generateToken(user._id, res);

    // Responce
    return res.status(200).json({
      success: true,
      message: "Login Successfully!",
      userId: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "internal server error !",
      error: error,
    });
  }
};

// Logout User
export const logout = async (req, res) => {
  try {
    await tokenRemover(res);
    return res.status(200).json({
      success: true,
      message: "Logout successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Get user posts
export const userposts = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("posts");
    const userPosts = user.posts.reverse();
    return res.status(200).json({
      success: true,
      userposts: userPosts,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get singal post to read
export const addToLikedPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    const user = await User.findById(userId);
    const post = await PostModel.findById(postId);
    if (user) {
      user.liked_posts.push(post._id);
      user.save();
      post.likes++;
      post.save();
      return res.status(200).json({
        success: true,
        message: "Liked",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "User Not Found!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get singal post to read
export const addCommentToPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    const { comment } = req.body;
    const user = await User.findById(userId);
    const post = await PostModel.findById(postId);

    if (user) {
      post.comments.push({ username: user.username, comment: comment });
      post.save();
    } else {
      return res.status(400).json({
        success: false,
        message: "User Not Found!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user data
export const updateUserData = async (req, res) => {
  try {
    // Get id from params
    const userId = req.user.id;

    // Get data for update user
    const { username, gender, profilePic } = req.body;

    // Find user by id and update the data
    const user = await User.findById(userId);
    if (username) {
      const isUsername = await User.findOne({ username: username });
      if (isUsername && isUsername._id.toString() !== userId) {
        return res.status(400).json({
          success: false,
          message: "Username is already exist!",
        });
      }
      user.username = username;
    }
    if (gender) {
      user.gender = gender;
    }
    if (profilePic) {
      user.profilePic = profilePic;
    }
    await user.save();

    // Response
    return res.status(200).json({
      success: true,
      message: "Update successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    // Get id from params
    const userId = req.user.id;
    // Find user for delete by id
    const deletedUser = await User.findById(userId);
    if (deletedUser) {
      await PostModel.deleteMany({ _id: { $in: deletedUser.blogs } });
      await User.deleteOne({ _id: userId });
      return res.status(200).json({
        success: true,
        message: "Deleted successfully!",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to delete!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
