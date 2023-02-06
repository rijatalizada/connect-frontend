import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeadingComponent from "../Components/Base/HeadingComponent";
import Loading from "../Components/Base/Loading";
import CourseItem from "../Components/Course/CourseItem";
import useFetch from "../CustomHooks/useFetch";
import { ICourse } from "../Types";

const headingUrl =
  "https://firebasestorage.googleapis.com/v0/b/connectimages-7c610.appspot.com/o/CoursesHeadingIMage.jpg?alt=media&token=81f5a090-7021-4d0f-81c4-52e62cd619f7";
const headingText = "Our Courses";

const url = "https://localhost:44336/api/Courses/getAllCourses";

const Courses = () => {
  const { id } = useParams();
  const [search, setSearch] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    if (search.trim() !== "") {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [search]);

  const [courses, loading, error] = useFetch(url + `/${id}`);

  if (loading) {
    return <Loading />;
  }

  return (
    <section>
      <header className="mb-[13rem] max-h-[26rem]">
        <HeadingComponent
          headingText={headingText}
          url={headingUrl}
          search={search}
          setSearch={setSearch}
          isSearching={true}
        />
      </header>
      <main className="mb-[13rem] vs:px-5 md:px-0 xl:px-5 container mx-auto">
        {isSearching ? (
          <div className="grid vs:grid-cols-2 md:!grid-cols-4  gap-10">
            {courses.filter((course : ICourse) => course.name.toLowerCase().trim().includes(search.toLowerCase().trim())).map((courses : ICourse) => {
              return <CourseItem key={courses.id} {...courses} />;
            } )}
          </div>
        ) : (
        courses.length > 0 ? (
          <div className="grid vs:grid-cols-2 md:!grid-cols-4  gap-10">
            {courses.map((course: ICourse) => {
              return <CourseItem key={course.id} {...course} />;
            })}
          </div>
        ) : (
          <p className="text-center text-color-primary text-[2rem]">
            There are currently no courses available
          </p>
        ))}
      </main>
    </section>
  );
};

export default Courses;
