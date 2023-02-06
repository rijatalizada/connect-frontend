import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeadingComponent from "../Base/HeadingComponent";
import Loading from "../Base/Loading";
import DiscussionItem from "./DiscussionItem";
import useFetch from "../../CustomHooks/useFetch";
import { IDiscussion, IDiscussionItem } from "../../Types";
import { ImReply } from "react-icons/im";
import { FcRating } from "react-icons/fc";
import { MdDateRange } from "react-icons/md";
import "./Discussion.css";
import getCookie from "../../CustomHooks/getCookies";
import { Rating } from "react-simple-star-rating";

const courseUrl = "https://localhost:44336/api/Courses/getCourse";

const DiscussionBody = ({
  discussions,
  showTop,
  loading,
  courseId,
}: {
  discussions: IDiscussionItem[];
  showTop: boolean;
  loading: boolean;
  courseId: string;
}) => {
  const { data, isOkay } = getCookie("user");
  const [search, setSearch] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [course, courseLoading, courseError] = useFetch(
    courseUrl + `/${courseId}`
  );

  useEffect(() => {
    if (search.trim() !== "") {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [search]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="discussions bg-white shadow-xl p-10">
      {showTop && (
        <p className="text-[1.5rem] font-bold mb-5 ">Top Discussions:</p>
      )}
      {!showTop && (
        <div className="flex justify-between items-center mb-3">
          <p className="text-color-primary text-[1.4rem]">{course.name}</p>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search by keyword"
            className="p-2 focus:outline-none border-solid  rounded-md border-2 border-[#f1]"
          />
        </div>
      )}
      {!showTop &&
        (isOkay ? (
          <Link to={`/discussion/create/${courseId}`} state={{ courseId }}>
            <button className=" my-4 bg-color-primary p-2 rounded-md text-color-secondary cursor-pointer">
              Create Thread
            </button>
          </Link>
        ) : (
          <div className="flex justify-between items-center mb-3">
            <p className="bg-color-primary text-color-secondary p-2 rounded-md">
              Start using all the features by logging in or signing up
            </p>
            <Link to={`/login`}>
              <button className="p-2 bg-color-primary text-color-secondary rounded-md">
                Sign In
              </button>
            </Link>
          </div>
        ))}
      <ul>
        <li className="box-border">
          <ul className="list-none m-0 p-0 table table-fixed text-[1.2rem] text-color-primary w-full bg-[#f1f1f1]">
            <li className="table-item text-[1.5rem] vs:w-[50%] lg:!w-[45rem]">
              TOPIC
            </li>
            <li className="table-item text-[1.5rem]  w-[10rem] text-center relative whitespace-nowrap text-ellipsis overflow-hidden ">
              <div className="flex items-center justify-center">
                <ImReply aria-describedby="Replies" />
              </div>
            </li>
            <li className="table-item  text-[1.5rem] not-mandatory w-[10rem]">
              <div className="flex justify-center">
                <FcRating />
              </div>
            </li>
            <li className="table-item vs:w-[50%] lg: text-[1.5rem]  not-mandatory">
              <MdDateRange className="float-right" />
            </li>
          </ul>
        </li>
        <li className="box-border">
          {discussions.length > 0 ? (
            !isSearching ? (
              discussions.map((discussion: IDiscussionItem) => {
                return (
                  <DiscussionItem
                    key={discussion.id}
                    disc={discussion}
                    showTop={showTop}
                  />
                );
              })
            ) : (
              isSearching &&
              discussions
                .filter((d) =>
                  d.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((discussion) => {
                  return (
                    <DiscussionItem
                      key={discussion.id}
                      disc={discussion}
                      showTop={showTop}
                    />
                  );
                })
            )
          ) : (
            <p className="text-center text-color-primary text-[1.3rem] my-5">
              There are currently no published discussions
            </p>
          )}
        </li>
      </ul>
    </div>
  );
};

export default DiscussionBody;
