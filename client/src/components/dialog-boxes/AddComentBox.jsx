import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddComentBox = ({ Show, setShow, Id }) => {
  const [comment, setcomment] = useState("");
  const apiBaseUrl = useSelector((state) => state.development.baseApiUrl); 

  const handleSumit = async (e) => {
    try {
      e.preventDefault();
      axios
        .post(
          `${apiBaseUrl}/api/user/add-comment/${Id}`,
          {
            comment,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success("Comment Added Successfully");
          }
          setcomment("");
          setShow(!Show);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className={`fixed ${
          Show ? "flex" : "hidden"
        } items-center justify-center flex-col z-50 top-0 left-0 h-screen w-full px-5 bg-[#0000007d]`}
      >
        <div className="editor border border-white bg-black relative md:mx-auto w-full md:w-10/12 flex flex-col gap-3 items-end rounded-lg py-4 px-6 max-w-2xl">
          <div className="w-full flex items-center justify-between">
            <h1 className="md:text-xl text-lg font-bold text-primary">
              Share Your Opinion !
            </h1>
            <IoMdClose
              onClick={() => {
                setShow(!Show);
              }}
              className="text-white text-2xl cursor-pointer"
            />
          </div>

          <form className="w-full rounded mx-auto text-white">
            <div className="">
              <textarea
                placeholder="Enter your comment here"
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
                className="w-full bg-black font-light rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 text-sm placeholder-primary focus:outline-none"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSumit}
                type="button"
                className="px-2.5 py-1.5 rounded text-white text-sm bg-primary"
                value="Comment"
              >
                Add Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddComentBox;
