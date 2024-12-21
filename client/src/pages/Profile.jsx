import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { FcIdea } from "react-icons/fc";
import { IoIosAddCircleOutline } from "react-icons/io";
import PostCard from "../components/post-components/PostCard";
import PostNotFound from "../components/post-components/PostNotFound";
import useFetchUserPosts from "../hooks/useFetchUserPosts";
import UploadPostBox from "../components/dialog-boxes/UploadPostBox";
import LoadingCircle from "../components/loading/LoadingCircle";

const Profile = () => {
  // States
  const [show, setshow] = useState(false);

  //For Auth Purpose
  const userData = useSelector((state) => state.user.userData);
  const apiBaseUrl = useSelector((state) => state.development.baseApiUrl);
  const userPosts = useSelector((state) => state.user.userPosts);

  const { loading } = useFetchUserPosts(`${apiBaseUrl}/api/user/user-posts`);

  // Retrun Loading component if loading is true
  if (loading) {
    return (
      <div className="h-screen w-full">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <>
      <UploadPostBox Show={show} setShow={setshow} />
      <section class="relative pt-40 pb-24">
        <img
          src="https://pagedone.io/asset/uploads/1705473378.png"
          alt="cover-image"
          class="w-full absolute top-0 left-0 z-0 h-60 object-cover"
        />
        {userData && (
          <CiEdit className="absolute right-0 top-0 m-4 text-4xl rounded-full p-2 border-2 border-black text-white bg-black" />
        )}
        <div class="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div class="flex items-center justify-center sm:justify-start relative z-10 mb-5">
            <img
              src={userData.profilePic}
              alt="user-avatar-image"
              class="border-4 w-40 border-solid border-white rounded-full object-cover"
            />
            <CiEdit className="absolute left-24 -bottom-1 m-4 text-4xl rounded-full p-2 border-2 border-black text-white bg-black" />
          </div>
          <div class="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
            <div class="block">
              <p class="font-normal text-base leading-7 text-gray-500">
                @{userData.username}
              </p>
              <h3 class="font-manrope font-bold text-4xl text-gray-900 mb-1">
                {userData.fullname}
              </h3>
            </div>
            <button class="rounded-full py-3.5 px-5 bg-gray-100 flex items-center group transition-all duration-500 hover:bg-indigo-100 ">
              <FcIdea />
              <span class="px-2 font-medium text-base leading-7 text-gray-700 transition-all duration-500 group-hover:text-indigo-600">
                Software Engineer
              </span>
            </button>
          </div>
          <div class="flex flex-col lg:flex-row max-lg:gap-5 items-center justify-between py-0.5">
            <div class="flex items-center gap-4">
              <button class="py-2 px-5 rounded-full bg-primary text-white font-semibold text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-100">
                Edit Profile
              </button>
              <button
                onClick={() => {
                  setshow(!show);
                }}
                class="py-2 px-5 flex items-center gap-2 rounded-full bg-green-100 text-primary font-semibold text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:bg-green-200"
              >
                <IoIosAddCircleOutline className="text-2xl" /> Upload New
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="lg:px-10 px-5">
        <h2 class="text-gray-800 sm:text-4xl text-3xl font-extrabold text-center">
          Your Posts
        </h2>
        <div className="blogs w-full h-full flex justify-center gap-5 items-center flex-wrap my-5 min-h-80">
          {Array.isArray(userPosts) && userPosts.length !== 0 ? (
            userPosts.map((post, index) => {
              return (
                <PostCard
                  key={index}
                  postId={post._id}
                  title={post.title}
                  content={post.content}
                  username={userData.username}
                  views={post.views}
                  likes={post.likes}
                  comments={post.comments.length}
                  thumnail={post.thumnail}
                  ProfilePic={userData.profilePic}
                />
              );
            })
          ) : (
            <PostNotFound />
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
