import React from "react";
import Login from "../pages/Login";
import { useSelector } from "react-redux";

const Protected = (props) => {
  //For Auth Purpose
  const isLogin = useSelector((state) => state.user.isLogin);

  const { Component } = props;
  return isLogin ? <Component /> : <Login />;
};

export default Protected;
