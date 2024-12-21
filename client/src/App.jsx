import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Protected from "./components/Protected";
import Explore from "./pages/Explore";
import Footer from "./components/header_footer/Footer";
import ViewPostPage from "./pages/ViewPostPage";
import Header from "./components/header_footer/Header";
import RegisterPage from "./pages/Register";

const App = () => {
  return (
    <>
      <div className="">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/view-post/:id" element={<ViewPostPage />} />
          <Route
            path="/user-profile"
            element={<Protected Component={Profile} />}
          />
        </Routes>
        <Footer />
        <Toaster 
          toastOptions={{
            className: 'text-black text-sm',
           
          }}
        />
      </div>
    </>
  );
};

export default App;
