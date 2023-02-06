import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DiscussionReply, IDiscussion } from "../../../Types";
import LeaveReply from "./LeaveReply";
import ReplyItem from "./ReplyItem";
import getCookie from "../../../CustomHooks/getCookies";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import { setTitle, toggleModal, toggleSuccess } from "../../../features/modal/modalSlice";

const url = "https://localhost:44336/api/Ratings/addRating";

const DiscussionCard = ({
  discussion,
  getData,
}: {
  discussion: IDiscussion;
  getData: () => void;
}) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const {
    title,
    rating,
    question,
    userId,
    replies,
    profileImage,
    userName,
    id,
  } = discussion;

  const [starRating, setRating] = useState(rating);
  const [cookieId, setCookieId] = useState<string>("");
  const dispatch = useDispatch();

  console.log(starRating);

  const { data, isOkay } = getCookie("user");

  const handleRating = async (rate: number) => {
    console.log(rate/20);
    const body = {
      givenRating: rate / 20,
      discussionId: id,
      userId: cookieId,
    };
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data}`,
      },
      body: JSON.stringify(body),
    });

  };

  useEffect(() => {
    if (isOkay) {
      setCookieId(data!.userId);
    }
  }, [isOkay]);

  return (
    <section id="discussionCard" className="mt-[5rem] p-5 bg-[#f1f1f1] ">
      <div className="flex items-center justify-between">
        <div className=" flex items-center">
          <div className="flex mr-5">
            <img
              src={profileImage}
              alt="profile"
              className="w-10 h-10 rounded-full mr-1"
            />
          </div>
          <div className=" mt-5">
            <Link to={`/users/${userId}`}>
              <p className="text-black hover:text-color-primary duration-200">
                {userName}
              </p>
            </Link>
            <p className="text-black text-[1.3rem] mt-3">{title}</p>
          </div>
        </div>
        <div className="pr-3 flex">
          <Rating
            onClick={handleRating}
            initialValue={starRating}
            ratingValue={0}
          />
        </div>
      </div>
      <div className="p-5">
        <div className=" mt-7">
          <p className="text-[1.2rem] my-2">Question:</p>
          <div className="replies bg-[white] rounded-md p-5 max-h-[20rem] overflow-auto">
            <p className="tracking-wider">{question}</p>
          </div>
        </div>
        {isReplying && (
          <LeaveReply
            discussionId={id}
            setIsReplying={setIsReplying}
            getData={getData}
          />
        )}
        <div className="leave-reply float-right p-5 mb-4">
          {isOkay && (
            <button
              onClick={() => setIsReplying(!isReplying)}
              className={`${
                isReplying
                  ? "bg-[white]"
                  : "bg-color-primary text-color-secondary"
              } p-2 rounded-lg cursor-pointer`}
            >
              {isReplying ? "Cancel" : "Reply"}
            </button>
          )}
        </div>
        <div className=" mt-14">
          <p className="text-[1.2rem] my-10 font-bold">Replies:</p>
          {!(replies.length > 0) ? (
            <p className="text-black text-[1.2rem] text-center">
              No replies yet
            </p>
          ) : (
            replies.map((reply: DiscussionReply) => (
              <ReplyItem key={reply.id} reply={reply} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default DiscussionCard;
