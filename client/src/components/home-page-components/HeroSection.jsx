import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HeroSection = () => {
  //For Auth Purpose
  const isLogin = useSelector((state) => state.user.isLogin);
  return (
    <>
      <div className="w-full h-screen lg:h-[520px] max-h-screen flex items-center justify-center px-5 lg:px-10">
        <div class="grid md:grid-cols-2 gap-12">
          <div class="text-left flex justify-center flex-col">
            <h2 class="lg:text-6xl text-5xl font-extrabold mb-4">
              Welcome to{" "}
              <span className="bg-clip-text bg-gradient-green-black text-transparent">
                LinkIdea !
              </span>
            </h2>
            <p class="mb-4 text-sm text-gray-500">
              Let's share ideas with your own words. Share your words with
              other.
            </p>
            {isLogin ? (
              <Link
                to={"/user-profile"}
                class="lg:w-[25%] text-center mt-6 px-5 bg-gradient-green-black py-2.5 rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none"
              >
                Go to profile
              </Link>
            ) : (
              <Link
                to={"/register"}
                class="lg:w-[25%] text-center mt-6 px-5 bg-gradient-green-black py-2.5 rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none"
              >
                Get started
              </Link>
            )}
          </div>
          <div class="max-h-96">
            <img
              loading="lazy"
              src="https://readymadeui.com/management-img.webp"
              alt="Placeholder Image"
              class="hue-rotate-[300deg] rounded-lg object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
