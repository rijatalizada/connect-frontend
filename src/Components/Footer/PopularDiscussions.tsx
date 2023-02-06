import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import useDate from "../../CustomHooks/useDate";
import { IDiscussion } from "../../Types";

const PopularDiscussions = ({ id, title, createdDate }: IDiscussion) => {
  const { stateYear, stateMonth, stateDay, isToday } = useDate(createdDate);

  return (
    <div className="under py-3 text-color-secondary relative ">
      <Link to={`/discussion/${id}`}>
        <p className="post-title mb-1 text-[1.1rem] duration-150 hover:text-[red]">{title}</p>
      </Link>
      <p className="date text-[0.9rem] flex items-center">
        <AiOutlineClockCircle className="mr-[4px]" />{" "}
        {!isToday ? `${stateYear} ${stateMonth} ${stateDay} ago` : "today"}
      </p>
    </div>
  );
};

export default PopularDiscussions;
