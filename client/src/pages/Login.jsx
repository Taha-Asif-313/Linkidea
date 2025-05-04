import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingCircle from "../components/loading/LoadingCircle";
import useAuth from "../hooks/useAuth";
import { setIsLogin, setUserData } from "../redux/userSlice";

const Login = () => {
  const apiBaseUrl = useSelector((state) => state.development.baseApiUrl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const { response, loading, error, fetchData } = useAuth(
    `${apiBaseUrl}/api/user/login`,
    inputs
  );

  useEffect(() => {
    if (response.success) {
      dispatch(setIsLogin(true));
      dispatch(setUserData(response));
      navigate("/");
    }
  }, [response, dispatch, navigate]);

  if (loading) {
    return <LoadingCircle />;
  }

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="md:border-[1px] p-6 border-slate-200 rounded-md flex flex-col items-center justify-center space-y-3">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="logo" className="w-8" />
          <span className="text-lg font-bold text-gray-800">
            Link<span className="text-primary">idea</span>
          </span>
        </Link>

        <form>
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

        <div className="flex flex-col space-y-4 w-full">
          <button
            onClick={fetchData}
            className="w-full bg-primary rounded-full py-1.5 text-sm text-white transition-all duration-200"
          >
            Log in
          </button>

          <div className="flex items-center justify-center w-full relative">
            <div className="text-sm font-bold px-5 absolute">Or</div>
          </div>

          <Link
            to="/register"
            className="w-full text-center bg-transparent border border-primary rounded-full py-1.5 text-sm text-primary transition-all duration-200 hover:bg-primary hover:text-white"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
