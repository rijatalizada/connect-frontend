import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeadingComponent from "../../Components/Base/HeadingComponent";
import Loading from "../../Components/Base/Loading";
import DiscussionBody from "../../Components/Discussion/DiscussionsBody";
import getCookies from "../../CustomHooks/getCookies";
import useFetch from "../../CustomHooks/useFetch";
import { IDiscussion, IDiscussionItem } from "../../Types";

const headingUrl =
  "https://firebasestorage.googleapis.com/v0/b/connectimages-7c610.appspot.com/o/volodymyr-hryshchenko-V5vqWC9gyEU-unsplash.jpg?alt=media&token=0fd52866-7149-4457-80e9-49b045e2cfb3";
const url = "https://localhost:44336/api/Discussions/getDiscussionsByCourse";


const Discussions = () => {
  const { courseId } = useParams();
  const [discussions, loading, error] = useFetch(url + `/${courseId}`);



  
  return (
    <section>
      <header className="max-h-[26rem] ">
        <HeadingComponent headingText={"Discussions"} url={headingUrl} isSearching={false} setSearch={function (search: string): void {
          throw new Error("Function not implemented.");
        } } search={""} />
      </header>
      <main className="my-[16rem] container mx-auto bg-slate-300">
        <DiscussionBody discussions={discussions} loading={loading} showTop={false} courseId={courseId!}/>
      </main>
    </section>
  );
};

export default Discussions;
