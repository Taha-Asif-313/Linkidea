import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddComentBox = ({ Show, setShow, Id }) => {
  const [comment, setcomment] = useState("");
  const apiBaseUrl = useSelector((state) => state.development.baseApiUrl);

  const handleSumit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${apiBaseUrl}/api/user/add-comment/${Id}`,
        { comment },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Comment Added Successfully");
        setcomment("");
        setShow(false);
      }
    } catch (error) {
      toast.error("Failed to add comment.");
      console.error(error);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition ${
        Show ? "opacity-100 visible" : "opacity-0 invisible"
      } bg-black/40`}
    >
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Share Your Opinion!
          </h2>
          <IoMdClose
            onClick={() => setShow(false)}
            className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800 transition"
          />
        </div>

        <form className="space-y-4">
          <textarea
            placeholder="Enter your comment here..."
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
            className="w-full h-24 resize-none border rounded-md p-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSumit}
              type="button"
              className="bg-primary text-white text-sm font-medium px-4 py-2 rounded hover:bg-primary-dark transition"
            >
              Add Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddComentBox;
