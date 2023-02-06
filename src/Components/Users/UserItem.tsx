import React from "react";
import { Link } from "react-router-dom";

const UserItem = ({
    id,
  firstName,
  lastName,
  userName,
  profileImage,
  discussions,
}: any) => {

    
  return (
    <Link to={`/user/${id}`} state={{ id}} className="bg-white p-10 flex items-center">
      <div className="img">
        <img src={profileImage} className="w-[3rem] rounded-[50%]" alt="" />
      </div>
      <div className="info ml-3">
        <p className="text-[1.4rem]">
          {firstName} {lastName}
        </p>
        <span>{userName}</span>
        <p className="text-[0.9rem]">Discussions Posted {discussions.length}</p>
      </div>
    </Link>
  );
};

export default UserItem;
