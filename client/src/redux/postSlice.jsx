import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    allPosts: [],
    latestPosts: null,
  },
  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setLatestPosts: (state, action) => {
      state.latestPosts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAllPosts, setLatestPosts } = postSlice.actions;

export default postSlice.reducer;
