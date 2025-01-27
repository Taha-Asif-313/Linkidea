import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingCircle from "../components/loading/LoadingCircle";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, setUserData } from "../redux/userSlice";

const Login = () => {
  // env Api base url
  const apiBaseUrl = useSelector((state) => state.development.baseApiUrl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });

  // Handle change function
  const handleChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  
  // Sumbit Data to backend
  const { response, loading, error, fetchData } = useAuth(
    `${apiBaseUrl}/api/user/login`,
    inputs
  );

  // if success
  if (response.success) {
    dispatch(setIsLogin(true));
    dispatch(setUserData(response));
    navigate("/");
  }

  // Retrun Loading component if loading is true
  if (loading) {
    return (
  
        <LoadingCircle />
      
    );
  }
  

  return (
    <>
      <div className="h-screen max-lg:h-screen flex justify-center items-center">
        <div className="py-10 px-8 md:border-[1px] border-slate-200 rounded-md flex flex-col items-center space-y-3">
          <div className="flex items-center justify-center">
            <img className="w-16" src="/logo.png" alt="Logo" />
          </div>
          <form className="text-white">
            <input
              className="px-4 py-2 mb-3 text-sm border-primary border-[1px] bg-transparent rounded-full w-80"
              placeholder="E-Mail"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <div className="flex flex-col space-y-1">
              <input
                className="py-2 px-4 text-sm border-[1px] border-primary bg-transparent rounded-full w-80"
                placeholder="Password"
                name="password"
                type="password"
                value={inputs.password}
                onChange={handleChange}
              />
              <a
                href="/forgot-password"
                className="font-medium text-[12px] text-primary"
              >
                Forgot password?
              </a>
            </div>
          </form>

          <div className="flex flex-col space-y-5 w-full">
            <button
              onClick={fetchData}
              className="w-full bg-gradient-custom rounded-full py-2 text-sm text-white transition-all duration-200"
            >
              Log in
            </button>
            <div className="flex items-center justify-center w-full relative">
              <div className="-mt-1 text-sm font-bold text-white px-5 absolute">
                Or
              </div>
            </div>
            <Link
              to={"/register"}
              className="w-full text-center bg-transparent border-2 border-primary rounded-full py-2 text-sm text-primary transition-all duration-200 hover:bg-primary hover:text-white"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
