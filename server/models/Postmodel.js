import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumnail: {
      type: String,
    },
    views: {
      type: Number,
      Default: 0,
    },
    likes: {
      type: Number,
      Default: 0,
    },
    comments: {
      type: Array,
      Default: [],
    },

  },
  { timestamps: true }
);

const PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
