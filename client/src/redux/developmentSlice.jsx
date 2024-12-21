import { createSlice } from "@reduxjs/toolkit";

export const developmentSlice = createSlice({
  name: "development",
  initialState: {
    baseApiUrl: "http://localhost:5000",
  },
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = developmentSlice.actions;

export default developmentSlice.reducer;
