import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { FaRegLightbulb, FaUsers, FaShareAlt } from "react-icons/fa";

import PostCard from "../post-components/PostCard";
import PostNotFound from "../post-components/PostNotFound";
import useFetchAllPosts from "../../hooks/useFetchAllPosts";
import LoadingCircle from "../loading/LoadingCircle";

const HeroSection = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const apiBaseUrl = useSelector((state) => state.development.baseApiUrl);
  const { response, loading } = useFetchAllPosts(`${apiBaseUrl}/api/post/get-all-posts`);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <section className="w-full bg-white text-black px-4 py-16 min-h-screen flex flex-col items-center">
      {/* Top Text Section */}
      <div className="max-w-4xl text-center space-y-4 mb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Share & Discover <span className="text-primary">Innovative Ideas</span>
        </h1>
        <p className="text-gray-700 text-sm">
          Linkidea is a platform to share, explore, and grow brilliant ideas together. 
          Inspire others or get inspired—your creativity belongs here.
        </p>

        <div className="flex justify-center gap-6 flex-wrap mt-4 text-primary">
          <div className="flex items-center gap-2 text-sm font-medium">
            <FaRegLightbulb className="text-xl" />
            Innovative Sharing
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <FaUsers className="text-xl" />
            Community-Driven
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <FaShareAlt className="text-xl" />
            Open for All
          </div>
        </div>

        <Link
          to={isLogin ? "/user-profile" : "/register"}
          className="inline-block mt-6 px-8 py-2 rounded-full bg-primary text-white text-sm font-semibold shadow-md hover:opacity-90 transition"
        >
          {isLogin ? "Go to Profile" : "Start Sharing Now"}
        </Link>
      </div>

      {/* Bottom Swiper Section */}
      <div className="w-full max-w-screen-xl">
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          modules={[Autoplay]}
          autoplay={{ delay: 10, disableOnInteraction: true }}
          speed={2500}
          loop={true}
          breakpoints={{
            300: {
              slidesPerView: 1,
              grid: { rows: 1 },
            },
            768: {
              slidesPerView: 1,
              grid: { rows: 2 },
            },
            1024: {
              slidesPerView: 2,
              grid: { rows: 2 },
            },
          }}
          className="w-full px-2 md:px-6"
        >
          {Array.isArray(response) && response.length > 0 ? (
            response.map((post, index) => (
              <SwiperSlide key={index} className="p-2">
                <PostCard
                  postId={post._id}
                  title={post.title}
                  content={post.content}
                  username={post.user.username}
                  views={post.views}
                  likes={post.likes}
                  comments={post.comments.length}
                  thumnail={post.thumnail}
                  ProfilePic={"https://avatar.iran.liara.run/public"}
                />
              </SwiperSlide>
            ))
          ) : (
            <PostNotFound />
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSection;
