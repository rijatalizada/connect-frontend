import React from "react";
import { DiscussionReply, IDiscussion } from "../../../Types";

const ReplyItem = ({reply} : {reply : DiscussionReply}) => {
  return (
    <div
      className="replies bg-[white] mb-[3rem] p-5 max-h-[10rem] overflow-auto"
    >
      <div className="">
        <div className="flex mr-5  items-center">
          <img
            src={reply.profileImage}
            alt="profile"
            className="w-10 h-10 rounded-full mr-3"
          />
          <p className="text-black hover:text-color-primary duration-200">
            {reply.userName}
          </p>
        </div>
        <div className="my-5 overflow-auto px-10 ">
          <p className="text-black text-[1.2rem] border-solid border-2 p-3">{reply.reply}</p>
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
