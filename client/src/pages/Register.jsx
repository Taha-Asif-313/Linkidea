import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoadingCircle from "../components/loading/LoadingCircle";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const RegisterPage = () => {
  // env Api base url
  const navigate = useNavigate();
  const apiBaseUrl = useSelector((state) => state.development.baseApiUrl);

  // States
  const [inputs, setinputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  // Handle change function
  const handleChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Sumbit Data to backend
  const { response, loading, error, fetchData } = useAuth(
    `${apiBaseUrl}/api/user/register`,
    inputs
  );

  if (response.success) {
    navigate("/login");
  }

  // Retrun Loading component if loading is true
  if (loading) {
    return (
      <div className="h-screen w-full">
        <LoadingCircle />
      </div>
    );
  }

  // Retrun error if error occurs
  if (error) {
    toast.error(error);
  }

  return (
    <>
      <div className="main relative min-h-screen lg:h-screen w-full flex items-center justify-center px-5  lg:pb-10 py-32 lg:pt-0 lg:px-24">
        {/* From that use for submit data to backend */}
        <div className="min-h-[520px] flex justify-center items-center bg-white">
          <div className="p-10 border-[1px] border-slate-200 rounded-md flex flex-col items-center space-y-3">
            <div className="py-8 flex items-center justify-center">
              <img className="-mt-10 w-16" src="/logo.png" alt="Logo" />
              <span className="text-lg -ml-4">
                Link<span className="text-primary">ideas</span>
              </span>
            </div>
            <form className="flex flex-col">
              <input
                className="p-2 mb-3 text-sm border-primary border-[1px] bg-transparent rounded-sm w-80"
                placeholder="Full Name"
                name="fullname"
                value={inputs.fullname}
                onChange={handleChange}
              />
              <input
                className="p-2 mb-3 text-sm border-primary border-[1px] bg-transparent rounded-sm w-80"
                placeholder="Username"
                name="username"
                value={inputs.username}
                onChange={handleChange}
              />
              <input
                className="p-2 mb-3 text-sm border-primary border-[1px] bg-transparent rounded-sm w-80"
                placeholder="E-Mail"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
              <input
                className="p-2 mb-3 text-sm border-primary border-[1px] bg-transparent rounded-sm w-80"
                placeholder="Password"
                name="password"
                type="password"
                value={inputs.password}
                onChange={handleChange}
              />
              <input
                className="p-2 mb-3 text-sm border-primary border-[1px] bg-transparent rounded-sm w-80"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                value={inputs.confirmPassword}
                onChange={handleChange}
              />
            </form>

            <div className="flex flex-col space-y-5 w-full">
              <button
                onClick={fetchData}
                className="w-full bg-primary border-2 border-primary rounded-full py-2 text-sm text-white transition-all duration-200 hover:bg-transparent hover:text-primary"
              >
                Register
              </button>
              <div className="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative">
                <div className="-mt-1 text-sm font-bod bg-white px-5 absolute">
                  Or
                </div>
              </div>
              <Link
                to={"/login"}
                className="w-full text-center bg-transparent border-2 border-primary rounded-full py-2 text-sm text-primary transition-all duration-200 hover:bg-primary hover:text-white"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
