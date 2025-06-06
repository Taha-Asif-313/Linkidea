import React from "react";

const LoadingCircle = () => {
  return (
    <div class="h-screen w-full z-50 bg-white absolute top-0 left-0 flex justify-center items-center">
      <div class="w-12 h-12 rounded-full absolute border border-solid border-gray-200"></div>
      <div class="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default LoadingCircle;
