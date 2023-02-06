import React from "react";
import { Link } from "react-router-dom";
import getCookie from "../../CustomHooks/getCookies";

const JoinDiscussion = () => {
  const { data, isOkay } = getCookie("user");

  return (
    <div className="container mx-auto grid grid-cols-2 shadow-2xl ">
      <div className="card-text  bg-color-primary text-color-secondary font-inconsolata p-[1rem] sm:p-7 lg:p-20 ">
        <p className=" sm:text-[2.2rem] lg:text-[3rem] md:mb-[0.3rem] font-bold">
          Lorem, ipsum dolor.
        </p>
        <p className="md:text-[1rem] text-[0.7rem] ">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Reprehenderit non, cumque odio laboriosam dolores nemo sequi
          distinctio quaerat, nisi dolorum accusamus explicabo! Deserunt
          similique temporibus ipsam. Quidem nostrum velit illo.
        </p>
        {!isOkay && (
          <Link to={`/register`}>
            <button className="sm:text-[0.8rem] md:text-[1.3rem] p-2 border-[1px] border-white rounded-md font-sans mt-7 transition-[.5s] hover:border-[#1d84b5] hover:text-color-primary hover:bg-color-secondary ">
              Register Now
            </button>
          </Link>
        )}
      </div>

      <div className="img-container ">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/connectimages-7c610.appspot.com/o/HeaderJoinUs.png?alt=media&token=3bcb5ef9-e8f9-4c85-b177-03ef0d0404db"
          alt=""
        />
      </div>
    </div>
  );
};

export default JoinDiscussion;
