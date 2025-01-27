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
      <div className="main relative h-screen w-full flex items-center justify-center px-5 ">
        {/* From that use for submit data to backend */}
        <div className="flex justify-center items-center">
          <div className="p-10 md:border-[1px] border-slate-200 rounded-md flex flex-col items-center space-y-3">
          <div className="flex items-center justify-center">
            <img className=" w-16" src="/logo.png" alt="Logo" />
          </div>
            <form className="flex flex-col text-white">
              <input
                className="px-4 py-2 mb-3 text-sm border-primary border-[1px] bg-transparent rounded-full w-80"
                placeholder="Full Name"
                name="fullname"
                value={inputs.fullname}
                onChange={handleChange}
              />
              <input
                className="px-4 py-2 mb-3 text-sm border-primary border-[1px] bg-transparent rounded-full w-80"
                placeholder="Username"
                name="username"
                value={inputs.username}
                onChange={handleChange}
              />
              <input
                className="px-4 py-2 mb-3 text-sm border-primary border-[1px] bg-transparent rounded-full w-80"
                placeholder="E-Mail"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
              <input
                className="px-4 py-2 mb-3 text-sm border-primary border-[1px] bg-transparent rounded-full w-80"
                placeholder="Password"
                name="password"
                type="password"
                value={inputs.password}
                onChange={handleChange}
              />
              <input
                className="px-4 py-2 mb-3 text-sm border-primary border-[1px] bg-transparent rounded-full w-80"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                value={inputs.confirmPassword}
                onChange={handleChange}
              />
            </form>

            <div className="flex flex-col w-full">
              <button
                onClick={fetchData}
                className="w-full bg-primary rounded-full py-2 text-sm text-white"
              >
                Register
              </button>
            
            <div className="text-white text-center text-sm mt-2">
              <p>Already have account? <Link to={'/login'} className="text-primary">go to login</Link></p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
