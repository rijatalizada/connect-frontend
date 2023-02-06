import React from "react";
import useFetch from "../CustomHooks/useFetch";

const url = "https://localhost:44336/api/AboutContent/GetHeader/1";
const urlGoals = "https://localhost:44336/api/Goals/Goals"

const Abiout = () => {
  const [data, loading, error] = useFetch(url);
  const [goals, laoding1, error1] = useFetch(urlGoals);

  return (
    <div className="container px-32 mx-auto pt-16 my-20">
      <header className="w-full ">
        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-7">
          <div className="w-full h-full flex flex-col gap-3">
            <div className="text-blue-600 text-[0.7rem] tracking-widest">
              CURIOUS ?
            </div>
            <div className="text-5xl pb-2 xl:pt-0 leading-tight font-bold text-gray-800 tracking-wide">
              Get to Know about us and relive our <br /> jorney
            </div>
            <div className="text-base tracking-wide text-gray-800 font-semibold pb-8">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolobus
              sed voluptatibus aspernatur recusandae.
            </div>
            <div className="flex gap-2 ">
              <span className="text-gray-800 text-bold">* * * * *</span>{" "}
              <div className="text-gray-400 text-sm">
                {" "}
                (4.8 out of 5 Ratings)
              </div>
            </div>
            <div className="text-sm text-gray-800 font-semibold">
              Based on 1000+ Reviews on
            </div>
          </div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/connectimages-7c610.appspot.com/o/1200091.jpg?alt=media&token=fa6f4dc1-a832-487c-83dc-24b830ee4114"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </header>
      <main className="w-full mt-16  pt-16">
        <div className="flex flex-col  xl:grid xl:grid-cols-[70%,30%] gap-7 items-center">
          <div className="bg-blue-400 w-full h-full pr-8 xl:pr-6 pl-14 xl:pl-28 pt-10 xl:pt-20 pb-12 flex flex-col gap-6 ">
            <div className="text-2xl text-white">
              {" "}
              <span className="text-[0.7rem] tracking-widest">
                OUR
              </span> <br /> Values
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8">
              {goals.map((goal : {id: number, goal: string}) => {
                return (
                  <div key={goal.id} className="flex gap-3 items-center">
                    <div className="p-4 bg-white rounded-tl-[50%] rounded-tr-[50%]">
                      <img
                        src="https://pic.onlinewebfonts.com/svg/img_464209.png"
                        alt=""
                        className="w-10 h-10 object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-[55%]">
                      <div className="text-white text-xl font-bold">
                        {goal.goal}
                      </div>
                      <div className="text-white text-sm ">{goal.goal}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" flex flex-col gap-2 justify-start">
            <div className="text-blue-600 text-[0.7rem]  tracking-widest">
              OUR
            </div>
            <div className="text-2xl leading-tight font-bold text-gray-800 tracking-wide">
              Goal Statement
            </div>
            <div className="pt-6 text-gray-800 tracking-wide">
              {data.headingText}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Abiout;
