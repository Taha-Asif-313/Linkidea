import React from "react";

const CommentCard = ({ Username, Data }) => {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition duration-200">
      <div className="p-4 flex items-center gap-3">
        {/* Avatar and Username */}
        <div className="flex items-center gap-2">
          <img
            src="https://avatar.iran.liara.run/public"
            alt="avatar"
            className="w-8 h-8 rounded-full border border-primary"
          />
          <span className="text-xs text-gray-700 font-medium">@{Username}</span>
        </div>

        {/* Comment Text */}
        <p className="ml-2 text-sm text-gray-800">{Data}</p>
      </div>
    </div>
  );
};

export default CommentCard;
