import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import useCreatePost from "../../hooks/useCreatePost";
import LoadingCircle from "../loading/LoadingCircle";
import { useSelector } from "react-redux";

const UploadPostBox = ({ Show, setShow }) => {
  const apiBaseUrl = useSelector((state) => state.development.baseApiUrl);
  const [inputs, setinputs] = useState({
    title: "",
    content: "",
    thumnail: "",
  });

  const { loading, createPost } = useCreatePost(
    `${apiBaseUrl}/api/post/create-post`
  );

  const onChangeHandler = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div
      className={`fixed ${
        Show ? "flex" : "hidden"
      } items-center justify-center z-50 top-0 left-0 h-screen w-full bg-black bg-opacity-50`}
    >
      <div className="bg-white relative mx-auto w-11/12 max-w-2xl flex flex-col gap-4 p-6 rounded-xl shadow-xl border border-gray-300">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            Share Your Idea!
          </h1>
          <IoMdClose
            onClick={() => setShow(false)}
            className="text-gray-600 hover:text-black text-2xl cursor-pointer"
          />
        </div>

        {/* Form Fields */}
        <input
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Title"
          name="title"
          value={inputs.title}
          onChange={onChangeHandler}
        />
        <input
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Idea image URL"
          name="thumnail"
          value={inputs.thumnail}
          onChange={onChangeHandler}
        />
        <textarea
          className="w-full h-24 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Describe everything about this post here"
          name="content"
          value={inputs.content}
          onChange={onChangeHandler}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              createPost(inputs);
              setShow(false);
            }}
            className="bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2 px-6 rounded-full transition duration-200"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPostBox;
