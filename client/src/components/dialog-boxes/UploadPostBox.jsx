import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import useCreatePost from "../../hooks/useCreatePost";
import LoadingCircle from "../loading/LoadingCircle";
import { useSelector } from "react-redux";

const UploadPostBox = ({ Show, setShow }) => {
  const apiBaseUrl = useSelector((state) => state.development.baseApiUrl);
  // State variables for inputs
  const [inputs, setinputs] = useState({
    title: "",
    content: "",
    thumnail: "",
  });

  const onChangeHandler = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const { loading, createPost } = useCreatePost(
    `${apiBaseUrl}/api/post/create-post`
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      createPost(inputs); // Make sure it's not being triggered multiple times
      setinputs({ title: "", content: "" });
      setShow(!Show);
    }
  };

  // Retrun Loading component if loading is true
  if (loading) {
    return (
      <div className="h-screen w-full">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div
      className={`fixed ${
        Show ? "flex" : "hidden"
      } items-center justify-center flex-col z-50 top-0 left-0 h-screen w-full bg-[#0000007d]`}
    >
      <div className="editor relative mx-auto w-10/12 flex flex-col gap-3 items-end rounded-lg border border-gray-300 p-4 shadow-lg max-w-2xl">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Share Your Idea !</h1>
          <IoMdClose
            onClick={() => {
              setShow(!Show);
            }}
            className="text-white text-4xl cursor-pointer"
          />
        </div>
        <div className="w-full flex flex-col">
          <input
            className="title rounded-md text-sm w-full bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="Title"
            type="text"
            name="title"
            value={inputs.title} // Two-way binding
            onChange={onChangeHandler} // Update state
          />
          <input
            className="title rounded-md text-sm w-full bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            placeholder="Thumnail URL"
            type="text"
            name="thumnail"
            value={inputs.thumnail} // Two-way binding
            onChange={onChangeHandler} // Update state
          />
          <textarea
            className="description text-sm rounded-md w-full bg-gray-100 sec p-3 h-20 border border-gray-300 outline-none"
            spellCheck="false"
            name="content"
            placeholder="Describe everything about this post here"
            value={inputs.content} // Two-way binding
            onChange={onChangeHandler} // Update state
          ></textarea>
        </div>

        <div className="w-full flex justify-end">
          <div
            className="w-[30%] text-center p-2 px-4 text-lg font-medium cursor-pointer text-gray-200 ml-2 bg-primary rounded-full"
            onClick={handleSubmit} // Submit the form
          >
            Post
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPostBox;
