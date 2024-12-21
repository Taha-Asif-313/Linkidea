import React from "react";

const LoadingCircle = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
         <div class="relative">
        <div class="w-12 h-12 rounded-full absolute border border-solid border-gray-200"></div>
        <div
            class="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-primary border-t-transparent">
        </div>
    </div>
    </div>
  );
};

export default LoadingCircle;
