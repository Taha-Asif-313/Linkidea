import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuFries, CiLogout } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import LogoutBox from "../dialog-boxes/LogoutBox";
import { FaArrowCircleRight } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutBox, setshowLogoutBox] = useState(false);

  const isLogin = useSelector((state) => state.user.isLogin);
  const userData = useSelector((state) => state.user.userData);

  const navItems = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Explore", url: "/explore" },
    { id: 3, name: "About", url: "/about" },
  ];

  return (
    <>
      <LogoutBox Show={showLogoutBox} setShow={setshowLogoutBox} />
      <header className="relative z-20 w-full bg-white">
        <div className="grid grid-cols-2 lg:grid-cols-3 max-w-[1300px] mx-auto px-5 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="logo" className="w-8" />
            <span className="text-lg font-bold text-gray-800">
              Link<span className="text-primary">idea</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-6 items-center justify-center">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                className="hover:text-primary transition text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth / Profile */}
          <div className="flex items-center gap-4 justify-end">
            {isLogin ? (
              <div className="flex items-center gap-2">
                <Link to="/user-profile" className="flex items-center gap-2">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={
                      userData?.profilePic ||
                      "https://avatar.iran.liara.run/public"
                    }
                    alt="profile"
                  />
                  <div className="hidden lg:flex flex-col items-start text-right">
                    <span className="text-xs text-gray-500">
                      @{userData?.username}
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      {userData?.fullname}
                    </span>
                  </div>
                </Link>
                <CiLogout
                  onClick={() => setshowLogoutBox(true)}
                  className="text-2xl text-gray-700 hover:text-primary cursor-pointer"
                />
              </div>
            ) : (
              <>
                <Link to="/register">
                  <button className="hidden lg:flex items-center gap-2 px-5 py-1.5 text-sm font-medium rounded-full bg-primary text-white">
                    Start Sharing
                    <FaArrowCircleRight className="text-lg" />
                  </button>
                </Link>
              </>
            )}

            {/* Mobile Toggle */}
            <button
              className="lg:hidden text-2xl text-gray-700"
              onClick={() => setIsOpen(true)}
            >
              <CiMenuFries />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="w-full bg-white absolute top-0 h-screen z-10 shadow-md px-5 py-4 flex flex-col gap-4 lg:hidden">
            <div className="flex justify-between items-center mb-2">
              <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="logo" className="w-9" />
                <span className="text-xl font-bold text-gray-800">
                  Link<span className="text-primary">idea</span>
                </span>
              </Link>
              <button
                className="text-3xl text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <IoClose />
              </button>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-primary transition text-base"
              >
                {item.name}
              </Link>
            ))}
            {!isLogin && (
              <>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <button className="mt-4 w-full px-4 py-2 text-sm rounded-full bg-primary text-white">
                    Start Sharing
                  </button>
                </Link>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
