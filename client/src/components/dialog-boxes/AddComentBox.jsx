import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";

const AddComentBox = ({ Show, setShow, Id }) => {
  const [comment, setcomment] = useState("");

  const handleSumit = async (e) => {
    try {
      e.preventDefault();
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/user/add-comment/${Id}`,
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
        <div className="editor bg-[#0000002d] relative md:mx-auto w-full md:w-10/12 flex flex-col gap-3 items-end rounded-lg border border-gray-300 p-4 shadow-lg max-w-2xl">
          <div className="w-full flex items-center justify-between">
            <h1 className="md:text-2xl text-lg font-bold text-white">
              Share Your Opinion !
            </h1>
            <IoMdClose
              onClick={() => {
                setShow(!Show);
              }}
              className="text-white text-4xl cursor-pointer"
            />
          </div>

          <form className="w-full bg-white rounded border p-2 mx-auto">
            <div className=" mb-2 mt-2">
              <textarea
                placeholder="comment"
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
                className="w-full bg-green-50 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              ></textarea>
            </div>
            <div className="flex justify-end px-4">
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
