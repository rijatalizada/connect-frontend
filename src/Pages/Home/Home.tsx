import React, { useState } from "react";
import useFetch from "../../CustomHooks/useFetch";
import Header from "../../Components/Home/Header";
import Nav from "../../Components/Base/Nav";
import JoinDiscussion from "../../Components/Home/JoinDiscussion";
import Loading from "../../Components/Base/Loading";
import DiscussionBody from "../../Components/Discussion/DiscussionsBody";
import { Rating } from "react-simple-star-rating";

const discusssionUrl =
  "https://localhost:44336/api/Discussions/getTopDiscussions";

const Home = () => {
  const [discussions, loading, error] = useFetch(discusssionUrl);

  return (
    <div className="home">
      <header className="mb-56">
        <Header />
      </header>
      <main className="container mx-auto mb-[10rem]">
        <DiscussionBody
          discussions={discussions}
          loading={loading}
          showTop={true}
          courseId={""}
        />
      </main>
    </div>
  );
};

export default Home;
