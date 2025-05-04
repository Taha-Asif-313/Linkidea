import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingCircle from "../loading/LoadingCircle";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import { CiRead } from "react-icons/ci";

const PostCard = ({
  postId,
  title,
  content,
  thumnail,
  username,
  ProfilePic,
  views,
  likes,
  comments,
  Delete,
}) => {

  let stcontent = content.slice(0, 80) + "...";
  // States
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const deleteBlog = async () => {
    setloading(true);
    try {
      await axios
        .delete(`https://blog-master-server.vercel.app/api/blog/delete/${id}`)
        .then((res) => {
          toast.success(res.data.message);
          navigate("/");
          setloading(false);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="mt-10 bg-black h-screen max-w-[380px] absolute top-0 left-0">
        <LoadingCircle />
      </div>
    );
  }

  return (
    // BlogCard Component
    <Link className="lg:w-[30%] md:w-[50%] w-full " to={`/view-post/${postId}`}>
      <div class="mb-2 w-full h-[280px] border border-zinc-900 cursor-pointer rounded-lg overflow-hidden group relative before:absolute before:inset-0 before:z-10 before:bg-black before:opacity-50">
        <img
          src={thumnail ? thumnail : "/default-thum.png"}
          alt="Blog Post 1"
          class="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-300"
        />
        <div class="md:p-4 px-3 py-4 absolute bottom-0 left-0 right-0 z-20">
          <h3 class="text-lg font-black leading-tight text-primary">{title}</h3>
          <div class="">
            <p class="text-gray-200 lg:text-sm text-[13px] ">{stcontent}</p>
          </div>
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center mt-2 z-10">
              {/* User logo */}
              <img
                className="w-6 rounded-full"
                src={ProfilePic ? ProfilePic : "/default-profile.jpg"}
              />

              {/* User id or Username */}
              <span className="inline-block rounded-full px-3 py-1 text-[12px] text-stone-50 mr-2 ">
                {username}
              </span>
              {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{date}</span> */}
            </div>
            <div>
              <div className="flex gap-2">
                <div className="flex text-white items-center justify-center gap-1 mt-4">
                  <CiRead className="text-white text-2xl " />
                  <span className="text-sm">{views}</span>
                </div>
                <div className="flex text-white items-center justify-center gap-1 mt-4">
                  <FaHeart className="text-red-600 text-xl " />
                  <span className="text-sm">{likes}</span>
                </div>
                <div className="flex text-white items-center justify-center gap-1 mt-4">
                  <FaRegCommentDots className="text-primary text-xl " />
                  <span className="text-sm">{comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
