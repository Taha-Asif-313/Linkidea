import React from "react";

const CommentCard = ({ Username, Data }) => {
  return (
    <>
      <div className="flex w-full justify-between border rounded-md">
        <div className="p-3 flex items-center gap-2">
          <div className="flex gap-1 items-center bg-gradient-custom px-4 py-1 rounded-full">
            <img
              src="https://avatar.iran.liara.run/public"
              className="object-cover w-6 rounded-full border border-primary"
            />

            <span className="text-[12px] font-normal">@{Username}</span>
          </div>
          <p className="text-[14px]">{Data}</p>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
