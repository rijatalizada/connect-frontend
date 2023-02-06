import React from "react";
import { Link } from "react-router-dom";
import { ICourse } from "../../Types";

const CourseItem = ({ id, name, discussions }: ICourse) => {

  

  return (
    <Link
      to={`/school/courses/discussions/${id}`}
      state={{ id }}
      className="p-7 bg-[#364253] text-color-secondary rounded-lg shadow-2xl flex flex-col justify-between hover:color-primary animate__animated animate__rollIn "
    >
      <p className="text-[1.5rem]">{name}</p>
      <p>{discussions.length} Discussions</p>
    </Link>
  );
};

export default CourseItem;
