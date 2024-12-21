import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { postSlice } from "./postSlice";
import { developmentSlice } from "./developmentSlice";

export default configureStore({
  reducer: {
    development:developmentSlice.reducer,
    user: userSlice.reducer,
    post: postSlice.reducer,
  },
});
