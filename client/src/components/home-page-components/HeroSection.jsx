import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import  PostCard  from "../post-components/PostCard";
import PostNotFound from "../post-components/PostNotFound";
import useFetchAllPosts from "../../hooks/useFetchAllPosts";


const HeroSection = () => {
  //For Auth Purpose
  const isLogin = useSelector((state) => state.user.isLogin);
  const apiBaseUrl = useSelector((state) => state.development.baseApiUrl);

  const { response, loading } = useFetchAllPosts(
    `${apiBaseUrl}/api/post/get-all-posts`
  );
  return (
    <>
      <div className="max-w-[1300px] max-lg:w-full max-lg:pt-20 md:px-5 h-screen lg:h-[520px] flex items-center justify-center">
        <div class="flex w-full max-lg:flex-col justify-between items-center ">
          <div class="text-left lg:pr-5 md:max-w-[30%] flex justify-center flex-col max-lg:items-center max-lg:px-10">
            <h2 class="lg:text-5xl max-lg:text-center text-4xl font-extrabold mb-4">
              Explore{" "}
              <span className="bg-gradient-custom text-transparent bg-clip-text">
                Ideas !
              </span>
            </h2>
            <p class="mb-4 text-sm max-lg:text-center">
              Let's share ideas with your own words. Share your words with
              other.
            </p>
            {isLogin ? (
              <Link
                to={"/user-profile"}
                class="lg:w-[100%] text-center mt-6 px-5 bg-gradient-custom py-2.5 rounded-full text-white text-sm tracking-wider font-medium outline-none"
              >
                Go to profile
              </Link>
            ) : (
              <Link
                to={"/register"}
                class="lg:w-[100%] text-center mt-6 px-5 bg-gradient-custom py-2.5 rounded-full text-white text-sm tracking-wider font-medium outline-none"
              >
                Get started
              </Link>
            )}
          </div>
          <div class="max-h-96 w-full max-lg:px-5 md:max-w-[70%] ">
          <div className="posts max-w-full h-full flex justify-between items-center flex-wrap my-4 min-h-80">
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            modules={[Autoplay]}
            autoplay={{
              delay: 10,
              disableOnInteraction: true,
            }}
            speed={2000}
            loop={true}
            breakpoints={{
              // Small devices
              300: {
                slidesPerView: 1,
                grid: { rows: 1 },
              },
              // Medium devices
              768: {
                slidesPerView: 1,
                grid: { rows: 2 },
              },
              // Large devices
              1024: {
                slidesPerView: 2,
                grid: { rows: 2 },
              },
            }}
            className="mySwiper px-10 gap-3"
          >
            {Array.isArray(response) && response.length !== 0 ? (
              response.map((post, index) => (
                <SwiperSlide key={index}>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
