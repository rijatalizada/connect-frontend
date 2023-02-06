import React from "react";
import useFetch from "../../CustomHooks/useFetch";
import { Markup } from "interweave";
import JoinDiscussion from "./JoinDiscussion";
import { ITitles } from "../../Types";
import Loading from "../Base/Loading";

const url = "https://localhost:44336/api/HomeTitles/getTitle";

const Titles = () => {
  const [headerTitles, loading] = useFetch(url);

  if (loading) {
    return <Loading/>;
  }
  return (
    <div className="w-full relative mb-3  container mx-10 md:mx-auto ">
      <div className="p-3 ">

            <div className="text-white" key={headerTitles.id}>
              <p className="lg:text-6xl md:text-4xl text-xl font-bold uppercase mb-[25px] text-skin-primary">
                {headerTitles.title}
              </p>
              <p className="mt-[10px] mb-[30px] text-[#fff] text-[1.2rem]  font-normal">
                <Markup content={headerTitles.subtitle} />
              </p>
            </div>

      </div>
    </div>
  );
};

export default Titles;
