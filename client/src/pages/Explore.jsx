import React from "react";
import useFetchAllPosts from "../hooks/useFetchAllPosts";
import LoadingCircle from "../components/loading/LoadingCircle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import PostNotFound from "../components/post-components/PostNotFound";
import PostCard from "../components/post-components/PostCard";
import { useSelector } from "react-redux";

const Explore = () => {
  const apiBaseUrl = useSelector((state) => state.development.baseApiUrl);

  const { response, loading } = useFetchAllPosts(
    `${apiBaseUrl}/api/post/get-all-posts`
  );

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
      <div className="mx-auto h-[520px] max-w-screen-2xl px-8 mt-10 lg:px-10">
        <h2 class="text-gray-800 text-center sm:text-3xl text-3xl font-extrabold border-primary px-2">
          Explore Posts
        </h2>
        <div className="posts w-full h-full flex justify-between items-center flex-wrap my-4 min-h-80">
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            autoplay={{
              delay: 2000, // Faster delay (2 seconds between slides)
              disableOnInteraction: false, // Keep autoplay running after interaction
            }}
            speed={600} // Transition speed (600ms for a smooth transition)
            loop={true}
            breakpoints={{
              // Small devices
              300: {
                slidesPerView: 1,
                grid: { rows: 1 },
              },
              // Medium devices
              768: {
                slidesPerView: 2,
                grid: { rows: 2 },
              },
              // Large devices
              1024: {
                slidesPerView: 3,
                grid: { rows: 2 },
              },
            }}
            className="mySwiper gap-3"
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
    </>
  );
};

export default Explore;
