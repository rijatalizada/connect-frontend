import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import useDate from "../../../CustomHooks/useDate";
import { IDiscussion } from "../../../Types";

const DiscussionInfo = ({
  title,
  createdDate,
  name,
  school,
  schoolId,
  courseId,
  replies,
}: IDiscussion) => {
  const { stateYear, stateMonth, stateDay, isToday } = useDate(createdDate);

  return (
    <section className="">
      <div className="navigation text-[1.2rem] bg-[#f1f1f1] p-8 flex items-center">
        <Link to="/" className="flex">
          <AiOutlineHome className="text-black duration-300 hover:text-color-primary" />
        </Link>
        <IoMdArrowDropright className="mx-1 mt-1 text-[0.9rem]" />
        <Link to={`/school/courses/${schoolId}`}>
          <span className="text-black duration-300 hover:text-color-primary">
            {school}
          </span>
        </Link>
        <IoMdArrowDropright className="mx-1 mt-1 text-[0.9rem]" />
        <Link to={`/school/courses/discussions/${courseId}`}>
          <span className="text-black duration-300 hover:text-color-primary">
            {name}
          </span>
        </Link>
        <IoMdArrowDropright className="mx-1 mt-1 text-[0.9rem]" />
        <span className="tracking-wider">{title.slice(0, 5)}...</span>
      </div>
      <div className="date text-[1.2rem] bg-[#f1f1f1] p-7 flex items-center mt-10 text-color-primary border-solid border-l-4 border-[#3a3a8092]">
        <span>
          This discussion has {replies.length} replies and was posted{" "}
          {!isToday ? `${stateYear} ${stateMonth} ${stateDay} ago` : "today"}
        </span>
      </div>
    </section>
  );
};

export default DiscussionInfo;
