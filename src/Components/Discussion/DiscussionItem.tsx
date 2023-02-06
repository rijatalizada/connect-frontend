import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IDiscussion, IDiscussionItem } from "../../Types";
import "./Discussion.css";
import useDate from "../../CustomHooks/useDate";
import { AiOutlineClockCircle } from "react-icons/ai";

const DiscussionItem = ({
  disc,
  showTop,
}: {
  disc: IDiscussionItem;
  showTop: boolean;
}) => {
  const {
    createdDate,
    id,
    title,
    rating,
    user,
    discussionReplies,
    courseName,
    userId
  } = disc;

  const { stateYear, stateMonth, stateDay, isToday } = useDate(createdDate);

  return (
    <div className="animate__animated animate__zoomInDown">
      <ul className="list-none m-0 p-0 table table-fixed text-[1.2rem] text-color-primary w-full bg-[white] border-b-[1px] ease-linear  animate__animated animate__zoomInDown ">
        <li className="table-item vs:w-[50%] lg:!w-[45rem] border-l-[1px]">
          <div>
            {showTop && (
              <p className="text-[0.9rem] text-black">{courseName}</p>
            )}
          </div>
          <Link to={`/discussion/${id}`}>
            <span className="duration-[0.4s] hover:text-[crimson]">
              {title}
            </span>
          </Link>
          <p className="text-[0.9rem] mt-1 text-[black]">
            started by :{" "}
            <Link
              to={`/users/${userId}`}
              className="text-color-primary duration-[0.4s]  hover:text-[crimson]"
            >
              {user}
            </Link>
          </p>
        </li>
        <li className="table-item w-[10rem] text-center relative whitespace-nowrap text-ellipsis overflow-hidden ">
          <div className="flex items-center justify-center">
            {discussionReplies}
          </div>
        </li>
        <li className="table-item not-mandatory w-[10rem]">
          <div className="flex justify-center">{rating}</div>
        </li>
        <li className="table-item not-mandatory">
          <div className="flex justify-end items-center vs:text-[1rem] 2xl:!text-[1.3rem]">
            <AiOutlineClockCircle className="mr-[4px]" />
            <span>
              {!isToday
                ? `${stateYear} ${stateMonth} ${stateDay} ago`
                : "today"}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DiscussionItem;
