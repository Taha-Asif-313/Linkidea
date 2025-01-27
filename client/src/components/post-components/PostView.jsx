import React, { useState } from "react";
import { IoShareSocial } from "react-icons/io5";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import {
  FaFacebook,
  FaLinkedin,
  FaRegComment,
  FaTwitter,
  FaWhatsappSquare,
} from "react-icons/fa";
import AddComentBox from "../dialog-boxes/AddComentBox";
import axios from "axios";
import toast from "react-hot-toast";
import CommentCard from "../cards/CommentCard";
import { useSelector } from "react-redux";

const PostView = ({
  postId,
  title,
  content,
  comments,
  username,
  fullname,
  ProfilePic,
  thumnail,
}) => {
  const [showAddComment, setshowAddComment] = useState(false);
  const pageUrl = window.location.href;
  const [liked, setliked] = useState(false);
  const apiBaseUrl = useSelector((state) => state.development.baseApiUrl);
  const shareOptions = [
    {
      platform: <FaFacebook />,
      color_code: "#316FF6",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        pageUrl
      )}`,
    },
    {
      platform: <FaTwitter />,
      color_code: "#1da1f2",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        pageUrl
      )}&text=${encodeURIComponent(title)}`,
    },
    {
      platform: <FaLinkedin />,
      color_code: "#0077B5",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        pageUrl
      )}&text=${encodeURIComponent(title)}`,
    },
    {
      platform: <FaWhatsappSquare />,
      color_code: "#075E54",
      url: `https://wa.me/?text=${encodeURIComponent(`${title} ${pageUrl}`)}`,
    },
  ];

  // Function to handle share
  const handleShare = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Function to handle web share
  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: pageUrl,
        });
       
      } catch (error) {
        alert("Sharing failed.");
      }
    } else {
      alert("Web Share API is not supported on this device.");
    }
  };

  // Function to handle like
  const handleLike = async () => {
    try {
      await axios
        .post(
          `${apiBaseUrl}/api/user/add-to-like/${postId}`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            setliked(true);
            toast.success(res.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AddComentBox
        Id={postId}
        Show={showAddComment}
        setShow={setshowAddComment}
      />
      <div className="flex max-h-screen text-white h-screen justify-between gap-5 pt-20 flex-col lg:flex-row lg:mx-24 mx-5 ">
        {/* Left side a post details */}
        <div className="md:w-[100%] lg:flex gap-5 w-full max-h-screen">
          {/* Post Display Section */}
          <div className="flex lg:w-[50%] w-full flex-col gap-2 md:max-h-[70%] overflow-y-auto">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <img
                  className="w-8"
                  src={
                    ProfilePic
                      ? ProfilePic
                      : "https://avatar.iran.liara.run/public"
                  }
                  alt=""
                />
                <div className="flex flex-col">
                  <span className="text-[8px]">@{username}</span>
                  <span className="lg:text-sm text-[12px]">{fullname}</span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={handleLike}
                  className="flex gap-1 items-center rounded text-2xl text-primary"
                >
                  {liked ? (
                    <IoIosHeart className="animate-pop" />
                  ) : (
                    <IoIosHeartEmpty />
                  )}
                </button>
                <button
                  className="flex text-xl text-primary gap-1 items-center p-2 rounded-md"
                  onClick={handleWebShare}
                >
                  {" "}
                  <IoShareSocial />
                </button>
                <button
                  onClick={() => {
                    setshowAddComment(!showAddComment);
                  }}
                  className="flex gap-2 items-center p-2 rounded bg-primary text-sm text-white"
                >
                  <FaRegComment />
                  Add Comment
                </button>
              </div>
            </div>
            <div class="max-w-5xl  overflow-hidden">
              <img
                src={thumnail ? thumnail : "/default-thum.png"}
                alt="Post 1"
                class="w-full rounded-lg md:h-64 mb-5 object-cover object-center group-hover:scale-110 transition-all duration-300"
              />
              <div>
                <h2 class="text-2xl font-bold mb-4">{title}</h2>
                <p class=" leading-relaxed text-sm">{content}</p>
              </div>
            </div>
          </div>

          {/* Comments display section */}
          <div class="w-full lg:w-[50%] max-h-screen lg:h-screen overflow-y-auto border-primary text-white">
            <h3 class="font-semibold my-2 lg:text-lg">Comments</h3>
            <div class="flex flex-col gap-5 ">
              {comments.map((comment) => (
                <CommentCard
                  key={comment}
                  Data={comment.comment}
                  Username={comment.username}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Share Features and other features soon on right side */}
        {/* <div className="md:border-l border-gray-400 md:w-[25%] p-5">
          <button
            className="flex bg-primary text-sm text-white gap-1 items-center p-2 rounded-md"
            onClick={handleWebShare}
          >
            {" "}
            <IoShareSocial /> Share
          </button>
          <p className="text-lg my-4 text-primary font-medium">Share on :</p>
          <div>
            {shareOptions.map(({ color_code, platform, url }) => (
              <button
                className="text-4xl ml-3"
                key={platform}
                style={{ color: color_code }} // Apply the color dynamically here
                onClick={() => handleShare(url)}
              >
                {platform}
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default PostView;
