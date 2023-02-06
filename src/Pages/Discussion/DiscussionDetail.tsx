import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Base/Loading";
import DiscussionCard from "../../Components/Discussion/DiscussionDetail/DiscussionCard";
import DiscussionInfo from "../../Components/Discussion/DiscussionDetail/DiscussionInfo";

import useFetch from "../../CustomHooks/useFetch";
import { IDiscussion } from "../../Types";



const DiscussionDetail = () => {
  const { id } = useParams();
  const url = "https://localhost:44336/api/Discussions/getDicsussion/" + id;
  // const [discussion, loading, error] = useFetch(`${url}${id}`);
  const [discussion, setDiscussion] = useState<IDiscussion>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const getData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setDiscussion(data);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, [url]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section>
      <header></header>
      <main className="container mx-auto shadow-xl my-[10rem] bg-white w-full  p-10">
        <DiscussionInfo {...discussion!} />
        <DiscussionCard discussion={discussion!} getData={getData} />
      </main>
    </section>
  );
};

export default DiscussionDetail;
