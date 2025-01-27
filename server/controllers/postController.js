import User from "../models/Usermodel.js";
import PostModel from "../models/Postmodel.js";

// All posts
export const getAllPosts = async (req, res) => {
  try {
    const allposts = await PostModel.find({}).populate("user", "username");
  
    return res.status(200).json({
      success: true,
      allposts: allposts,
    });
   
    
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// Create post
export const createpost = async (req, res) => {
  try {
    const { title, content } = req.body; // Assuming file is Base64-encoded
    const userId = req.user.id;
    const thumbnail = req.file; // File information from multer
    console.log(thumbnail);


    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, content, file, and filename are required.",
      });
    }

    // Ensure user ID exists
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is missing from the request",
      });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create a new post
    const newPost = new PostModel({
      title,
      content,
      likes:0,
      views:0,
      comments:[],
      thumnail: `http://localhost:5000/uploads/${thumbnail.originalname}`, // Save the filename
      user: user._id,
      username: user.username,
    });

    // Save the post and update the user's posts
    await newPost.save();
    user.posts.push(newPost);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Post uploaded successfully!",
      post: newPost, // Optionally include the post details in the response
    });
  } catch (error) {
    console.error("Error in createpost:", error); // Improved error logging
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const getPostData = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId).populate("user");
    if (post) {
      post.views++
      post.save();
      return res.status(200).json({
        success: true,
        postdata: post,
        username:post.user.username,
        fullname:post.user.fullname,
        profilepic:post.user.profilePic
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Post not found!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update post by id
export const updatepost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    if (title) {
      await post.findByIdAndUpdate(postId, { title: title });
    }
    if (content) {
      await post.findByIdAndUpdate(postId, { content: content });
    }
    return res.status(200).json({
      success: true,
      message: "post update succesfully!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// Delete post by Id
export const deletepost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;
    const user = await User.findById(userId);
    const post = await PostModel.findById(postId);
    if (user) {
      await user.posts.pull(id);
      await post.user.save();
      await PostModel.deleteOne(post);
    } else {
      return res.status(200).json({
        success: false,
        message: "user not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "post deleted successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
