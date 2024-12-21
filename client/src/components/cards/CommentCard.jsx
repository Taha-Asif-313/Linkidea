import React from "react";

const CommentCard = ({ Username, Data }) => {
  return (
    <>
      <div className="flex w-full justify-between bg-green-50 border rounded-md">
        <div className="p-3">
          <div className="flex gap-1 items-center">
            <img
              src="https://avatar.iran.liara.run/public"
              className="object-cover w-6 rounded-full border border-primary"
            />

            <span className="text-[12px] font-normal">@{Username}</span>
          </div>
          <p className=" text-sm mt-2">{Data}</p>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
