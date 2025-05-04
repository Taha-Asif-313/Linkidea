import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../../redux/userSlice";
import LoadingCircle from "../loading/LoadingCircle";

const LogoutBox = ({ Show, setShow }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const apiBaseUrl = useSelector((state) => state.development.baseApiUrl);

  const handleLogout = async () => {
    try {
      setloading(true);
      const res = await axios.post(
        `${apiBaseUrl}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setIsLogin(false));
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : error.message
      );
    } finally {
      setShow(false);
      setloading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 px-4 flex items-center justify-center transition ${
        Show ? "opacity-100 visible" : "opacity-0 invisible"
      } bg-black/40`}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg relative p-6">
        <IoMdClose
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-xl text-gray-500 cursor-pointer hover:text-gray-700 transition"
        />
        <div className="text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
          >
            <path
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Are you sure you want to logout?
          </h3>
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={handleLogout}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={() => setShow(false)}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutBox;
