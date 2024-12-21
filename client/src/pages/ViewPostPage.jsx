import React from "react";
import { useParams } from "react-router-dom";
import LoadingCircle from "../components/loading/LoadingCircle";
import PostView from "../components/post-components/PostView";
import useViewPost from "../hooks/useViewPost";
import { useSelector } from "react-redux";

const ViewPostPage = () => {
  const { id } = useParams();

    const apiBaseUrl = useSelector((state) => state.development.baseApiUrl);


  const { response, loading } = useViewPost(
    `${apiBaseUrl}/api/post/view-post/${id}`
  );

  if (loading)
    return (
      <div className="w-full h-screen">
        <LoadingCircle />
      </div>
    );

  return (
    <>
      {response && (
        <PostView
          postId={response.postdata._id}
          title={response.postdata.title}
          content={response.postdata.content}
          thumnail={response.postdata.thumnail}
          comments={response.postdata.comments}
          username={response.username}
          fullname={response.fullname}
          ProfilePic={response.profilepic}
        />
      )}
    </>
  );
};

export default ViewPostPage;
