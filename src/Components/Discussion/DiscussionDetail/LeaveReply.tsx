import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import getCookie from "../../../CustomHooks/getCookies";
import {
  setTitle,
  toggleModal,
  toggleSuccess,
} from "../../../features/modal/modalSlice";

const url = "https://localhost:44336/api/Replies/createReply";

const LeaveReply = ({
  discussionId,
  setIsReplying,
  getData,
}: {
  discussionId: number;
  setIsReplying: (isReplying: boolean) => void;
  getData: () => void;
}) => {
  const [userId, setUserId] = useState<string>("");
  const [reply, setReply] = useState<string>("");
  const [bearerToken, setBearerToken] = useState<string>("");
  const dispatch = useDispatch();

  const { data, isOkay } = getCookie("user");

  useEffect(() => {
    if (isOkay == true) {
      setUserId(data!.userId);
      setBearerToken(data!.token);
    }
  }, [isOkay]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      reply,
      userId,
      discussionId,
    };

    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(data),
    });

    if (req.status === 201) {
      setReply("");
      getData();
      dispatch(toggleModal(true));
      dispatch(setTitle("Reply Added"));
      dispatch(toggleSuccess(true));
    } else {
      dispatch(toggleModal(true));
      dispatch(setTitle("Reply Failed"));
      dispatch(toggleSuccess(false));
    }

    setReply("");
    setIsReplying(false);
    getData();
  };

  return (
    <div className="my-5 ">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="reply" className="block text-[1.2rem] my-2">
          Reply
        </label>
        <textarea
          name="reply"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          id="reply"
          placeholder="Message"
          className={`h-[120px] sm:h-[185px] resize-none py-3 px-[15px] block w-full !outline-none text-sm border-[#1d84b5] text-[#888] leading-6 font-normal bg-white !border !border-solid `}
          required
        ></textarea>

        <button
          type="submit"
          className={`bg-color-primary text-color-secondary p-2 rounded-lg cursor-pointer mt-2`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LeaveReply;
