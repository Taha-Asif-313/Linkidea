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
      axios
        .post(`${apiBaseUrl}/api/user/logout`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            setShow(!Show);
            dispatch(setIsLogin(false));
            navigate("/");
            setloading(false);
          }
        });
    } catch (error) {
      console.log(error);
      toast.error(error.response ? error.response.data.message : error.message);
      setloading(false);
    }
  };
  if (loading)
    return (
      <div className="w-full h-screen">
        <LoadingCircle />
      </div>
    );
  return (
    <>
      <div
        className={`fixed ${
          Show ? "flex" : "hidden"
        } items-center justify-center flex-col z-50 top-0 left-0 h-screen w-full px-5 bg-[#0000007d]`}
      >
        <div className="flex overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-[#0000007d] rounded-lg shadow">
              <IoMdClose
                onClick={() => {
                  setShow(!Show);
                }}
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              />
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-white">
                  Are you sure you want to logout?
                </h3>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="text-white bg-primary hover:bg-green-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-100 "
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutBox;
