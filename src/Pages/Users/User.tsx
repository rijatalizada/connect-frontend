import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Base/Loading";
import useFetch from "../../CustomHooks/useFetch";

const getUser = "https://localhost:44336/api/Users/GetUser/";

const User = () => {
  const { id } = useParams();
  console.log(id);
  
  const [user, loading, error] = useFetch(getUser + id);

  if (loading) {
    return <Loading />;
  }

  return (
    <section>
      <header className="h-[10rem] bg-[#00000024] flex items-center justify-center">
        <p
          className="text-[2rem] font-triscope
           "
        >
          {user.firstName} {user.lastName}
        </p>
      </header>
      <main className="container my-32 mx-auto ">
        <div className="mb-10 flex w-full justify-between">
          <p className="font-inconsolata font-bold text-[1.1rem] text-color-primary">
            {user.userName}
          </p>
          <div>
            <Link
              to={"/searchUsers"}
              className="text-color-primary mx-3 border-[#1d84b5] border-solid border-2 p-2 rounded-md duration-[0.4s] hover:text-color-secondary hover:bg-color-primary "
            >
              Search Other users
            </Link>
          </div>
        </div>
        <div className="grid lg:grid-cols-[58%,42%] gap-6 border-b-2 border-[#1d84b5] pb-10">
          <div id="bio" className="flex justify-center items-center">
            <div className="mt-10">
              <p className="text-[1rem] text-[#00000075]">Bio</p>
              <p className="mt-7 text-color-primary text-[1.3rem] md:text-[2.1rem] font-triscope">
                {user.bio}
              </p>
            </div>
          </div>
          <div>
            <img className="w-full h-full" src={user.profileImage} alt="" />
          </div>
        </div>
      </main>
    </section>
  );
};

export default User;
