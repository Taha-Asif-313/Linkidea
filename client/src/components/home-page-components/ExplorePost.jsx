import React from "react";
import LoadingCircle from "../loading/LoadingCircle";
import PostCard from "../post-components/PostCard";
import PostNotFound from "../post-components/PostNotFound";
import useFetchAllPosts from "../../hooks/useFetchAllPosts";
import { useSelector } from "react-redux";

const ExplorePost = () => {
  const allPosts = useSelector((state) => state.post.allPosts);
  const apiBaseUrl = useSelector((state) => state.development.baseApiUrl);

  const { loading } = useFetchAllPosts(
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
      <div className="blog-section mx-auto max-w-screen-2xl px-5 mt-32 lg:px-10">
        <h2 class="text-gray-800 sm:text-4xl text-3xl font-extrabold text-center mb-16">
          Latest Posts
        </h2>

        <div className="posts w-full h-full flex justify-center gap-3 items-center flex-wrap my-5 min-h-80">
          {Array.isArray(allPosts) && allPosts.length !== 0 ? (
            allPosts.map((post, index) => (
              <PostCard
                key={index}
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
            ))
          ) : (
            <PostNotFound />
          )}
        </div>
      </div>
    </>
  );
};

export default ExplorePost;
