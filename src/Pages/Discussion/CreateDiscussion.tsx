import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import getCookie from "../../CustomHooks/getCookies";
import useFetch from "../../CustomHooks/useFetch";
import { setTitle, toggleModal, toggleSuccess } from "../../features/modal/modalSlice";

const url = "https://localhost:44336/api/Discussions/createDiscussion";
const courseUrl = "https://localhost:44336/api/Courses/getCourse/";

const CreateDiscussion = () => {
  const { courseId } = useParams();
  const [course, loaidng, error] = useFetch(courseUrl + courseId);
  const [title, seTitle] = useState<string>("");
  const [question, seQuestion] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [bearerToken, setBearerToken] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isOkay } = getCookie("user");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isOkay) {
      setUserId(data!.userId);
      setBearerToken(data!.token);
    }
  }, [isOkay]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = {
      title: title,
      question: question,
      courseId: courseId,
      userId: userId,
    };

    try {
      const req = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(obj),
      });

      if (req.status === 201) {
        seTitle("");
        seQuestion("");
        navigate("/school/courses/discussions/" + courseId);
        dispatch(toggleModal(true));
        dispatch(setTitle("Discussion Successfully Created"));
        dispatch(toggleSuccess(true)) 
      } else{ 
        dispatch(toggleModal(true));
        dispatch(setTitle("Discussion Failed"));
        dispatch(toggleSuccess(false)) 
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <main className="my-[7rem] container mx-auto">
      <div className="text-center mb-10 text-[2rem] text-color-primary">
        <p>Create thread for {course.name}</p>
      </div>
    
      <section className="shadow-sm bg-white ">
        <div className="p-10">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-10">
              <label htmlFor="title" className="">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => seTitle(e.target.value)}
                className="block my-3 w-full p-3 border-solid border-[#1d84b5] border-[1px] rounded-md  focus:outline-none"
                placeholder="Title"
                required
              />
            </div>
            <div className="mb-10">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={question}
                onChange={(e) => seQuestion(e.target.value)}
                className="form-control block my-3 w-full p-3 h-[14rem] overflow-auto resize-none  border-solid border-[#1d84b5] border-[1px] rounded-md  focus:outline-none"
                placeholder="Description"
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-[#1d84b5] p-2 text-color-secondary rounded-md cursor-pointer text-center ">
                Create
              </button>
              <Link to={`/school/courses/discussions/${courseId}`}>
                <button className="p-2 my-2 bg-slate-300 rounded-md">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateDiscussion;
