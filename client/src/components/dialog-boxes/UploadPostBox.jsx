import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import useCreatePost from "../../hooks/useCreatePost";
import LoadingCircle from "../loading/LoadingCircle";
import { useSelector } from "react-redux";
import axios from "axios";
import { storage } from "../../appwrite/appwrite";

const UploadPostBox = ({ Show, setShow }) => {
  const apiBaseUrl = useSelector((state) => state.development.baseApiUrl);
  // State variables for inputs
  const [inputs, setinputs] = useState({
    title: "",
    content: "",
    thumnail: "",
  });

  const [file, setfile] = useState();

  const { loading, createPost } = useCreatePost(
    `${apiBaseUrl}/api/post/create-post`
  );

  const onChangeHandler = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setfile(e.target.files[0]);
  };

  const uploadFileToBucket = async (file) => {
    try {
      // Replace 'myBucket' with your bucket ID
      const bucketId = "6798ab6e000af1a20419";

      // Upload the file
      const response = await storage.createFile(bucketId, "unique()", file);

      console.log("File uploaded successfully:", response);
      return response; // Returns the file details
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const CreatePost = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (loading) return; // Prevent multiple submissions

    try {
      // Step 1: Upload the file
      await uploadFileToBucket(file);
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("content", inputs.content);
      formData.append("file", file);

      const fileUploadResponse = await axios.post(
        `${apiBaseUrl}/api/post/create-post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(fileUploadResponse);

      // Reset inputs and states
      setinputs({ title: "", content: "" });
      setShow(!Show);
    } catch (error) {
      console.error("Error in CreatePost:", error);
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
      } items-center justify-center flex-col z-50 top-0 left-0 h-screen w-full text-white bg-[#0000007d]`}
    >
      <div className="editor bg-black relative mx-auto w-10/12 flex flex-col gap-3 items-end rounded-lg border border-gray-300 px-6 py-6 shadow-lg max-w-2xl">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Share Your Idea !</h1>
          <IoMdClose
            onClick={() => {
              setShow(!Show);
            }}
            className="text-white text-2xl cursor-pointer"
          />
        </div>
        <div className="w-full flex flex-col">
          <input
            className="title rounded-md font-light text-sm w-full bg-black border border-gray-300 py-2 px-4 mb-4 outline-none"
            spellCheck="false"
            placeholder="Title"
            type="text"
            name="title"
            value={inputs.title}
            onChange={onChangeHandler}
          />

          <textarea
            className="description text-sm rounded-md w-full font-light bg-black mb-4 p-3 h-20 border border-gray-300 outline-none"
            spellCheck="false"
            name="content"
            placeholder="Describe everything about this post here"
            value={inputs.content}
            onChange={onChangeHandler}
          ></textarea>
          <label
            for="uploadFile1"
            class="text-center rounded w-full min-h-[180px] py-4 px-4 flex flex-col items-center justify-center cursor-pointer border border-gray-300 mx-auto font-[sans-serif]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-10 mb-3 fill-gray-400"
              viewBox="0 0 24 24"
            >
              <path
                d="M22 13a1 1 0 0 0-1 1v4.213A2.79 2.79 0 0 1 18.213 21H5.787A2.79 2.79 0 0 1 3 18.213V14a1 1 0 0 0-2 0v4.213A4.792 4.792 0 0 0 5.787 23h12.426A4.792 4.792 0 0 0 23 18.213V14a1 1 0 0 0-1-1Z"
                data-original="#000000"
              />
              <path
                d="M6.707 8.707 11 4.414V17a1 1 0 0 0 2 0V4.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414Z"
                data-original="#000000"
              />
            </svg>
            <p class="text-gray-400 font-semibold text-sm">
              {file ? (
                file.name
              ) : (
                <>
                  Choose<span class="text-[#007bff]"> image about idea</span> to
                  upload
                </>
              )}
            </p>
            <input
              onChange={fileChangeHandler}
              type="file"
              id="uploadFile1"
              class="hidden"
            />
            <p class="text-xs text-gray-400 mt-2">
              PNG, JPG SVG, and WEBP are Allowed.
            </p>
            <button onClick={()=>{console.log("click");
            }}>Upload</button>
          </label>
        </div>

        <div className="w-full flex justify-end">
          <div
            className="w-[30%] text-center  text-sm py-1.5 px-4 font-medium cursor-pointer text-gray-200 ml-2 bg-gradient-custom rounded-full"
            onClick={CreatePost} // Submit the form
          >
            Post
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPostBox;
