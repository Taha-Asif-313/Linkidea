import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userData: null,
    userPosts: [],
    userLikedPosts: null,
  },
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserPosts: (state, action) => {
      // Ensure userPosts is an array before spreading
      state.userPosts = action.payload;
    },
    setUserLikedPosts: (state, action) => {
      state.userLikedPosts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLogin, setUserData, setUserPosts, setUserLikedPosts } =
  userSlice.actions;

export default userSlice.reducer;
