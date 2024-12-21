import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useSelector } from "react-redux";
import LogoutBox from "../dialog-boxes/LogoutBox";

const Header = () => {
  // For menu mobile optimization
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutBox, setshowLogoutBox] = useState(false);

  //For Auth Purpose
  const isLogin = useSelector((state) => state.user.isLogin);
  const userData = useSelector((state) => state.user.userData);

  // Login / Logout Items
  const logoutItems = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Explore", url: "/explore" },
    { id: 3, name: "About", url: "/about" },
  ];
  const loginItems = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Explore", url: "/explore" },
    { id: 3, name: "About", url: "/about" },
  ];

  return (
    <>
      <LogoutBox Show={showLogoutBox} setShow={setshowLogoutBox} />
      <header className="flex shadow-md px-4 sm:px-10 bg-white max-h-[55px] tracking-wide relative z-50">
        <div className="flex items-center justify-between gap-5 w-full">
          <Link className="lg:w-[30%] w-[50%] flex items-end py-4" to={"/"}>
            <img src="/logo.png" alt="logo" className="w-10" />
            <span className="text-sm -ml-1">
              Link<span className="text-primary">ideas</span>
            </span>
          </Link>
          <div
            id="collapseMenu"
            className={`${
              isOpen ? "max-lg:block" : "max-lg:hidden"
            } w-[40%] lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <button
              id="toggleClose"
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
            >
              <IoClose className="text-2xl" />
            </button>
            <ul className="lg:flex justify-center max-lg:justify-start gap-x-2 max-lg:space-y-3 max-lg:fixed max-lg:bg-green-50 max-lg:w-1/2 max-lg:min-w-[200px] max-lg:top-0 max-lg:left-0 max-lg:py-4 max-lg:px-5 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
              <li className="px-2 mb-10 hidden max-lg:block">
                <Link className="lg:w-[30%] w-[50%] flex items-end" to={"/"}>
                  <img src="/logo.png" alt="logo" className="w-10" />
                  <span className="text-sm -ml-1">
                    Link<span className="text-primary">ideas</span>
                  </span>
                </Link>
              </li>

              {isLogin
                ? loginItems.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className="max-lg:border-b border-gray-300 md:mx-3 max-lg:my-1 "
                      >
                        <Link
                          to={item.url}
                          className="hover:text-primary block md:text-sm text-[12px]"
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })
                : logoutItems.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className="max-lg:border-b border-gray-300 max-lg:py-1 px-3"
                      >
                        <Link
                          to={item.url}
                          className="hover:text-primary block text-sm"
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
            </ul>
          </div>

          <div className="flex w-[50%] lg:w-[30%] justify-end space-x-4">
            {isLogin ? (
              <div className="flex items-center">
                <Link to={"/user-profile"} className=" flex gap-2 items-center">
                  {userData && (
                    <>
                      <img className="w-8" src={userData.profilePic} alt="" />
                      <div className="flex flex-col">
                        <span className="text-[8px]">@{userData.username}</span>
                        <span className="lg:text-sm text-[12px]">
                          {userData.fullname}
                        </span>
                      </div>
                    </>
                  )}
                </Link>
                <CiLogout
                  onClick={() => {
                    setshowLogoutBox(true);
                  }}
                  className="text-2xl cursor-pointer ml-4 max-lg:hidden"
                />
              </div>
            ) : (
              <>
                <Link
                  to={"/register"}
                  className="text-center hidden md:block px-4 py-2 w-[100%] md:w-[30%] text-[12px] rounded-md text-white bg-primary transition-all ease-in-out duration-300 hover:text-primary hover:bg-black"
                >
                  Get Started
                </Link>
                <Link
                  to={"/login"}
                  className="text-center px-4 py-2  w-[100%] md:w-[20%] text-[12px] rounded-md text-white bg-primary transition-all ease-in-out duration-300 hover:text-primary hover:bg-black"
                >
                  Login
                </Link>
              </>
            )}

            <button
              id="toggleOpen"
              className="lg:hidden"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <CiMenuFries className="text-2xl" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
