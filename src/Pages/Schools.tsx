import React from "react";
import Loading from "../Components/Base/Loading";
import HeadingComponent from "../Components/Base/HeadingComponent";
import SchoolItem from "../Components/School/SchoolItem";
import useFetch from "../CustomHooks/useFetch";
import { ISchool } from "../Types";
import Error from "../Components/Base/Error";

const schoolsUrl = "https://localhost:44336/api/Schools/getAllSchools";

const headingImg =
  "https://firebasestorage.googleapis.com/v0/b/connectimages-7c610.appspot.com/o/puzzle.jpg?alt=media&token=81e6431d-a57a-4d90-8779-e941e75e210b";

const headingText = "Our Schools";

const Schools = () => {
  const [schools, loading, error] = useFetch(schoolsUrl);
  const [search, setSearch] = React.useState<string>("");
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <section className="mb-[10rem]">
      <header className="mb-[17rem] max-h-[26rem]">
        <HeadingComponent url={headingImg} search={search} setSearch={setSearch} headingText={headingText} isSearching={false} />
      </header>
      <main>
        <div className="schools container px-5  md:px-0 sm:mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4  gap-10">
            {schools.map((school: ISchool) => {
              return <SchoolItem key={school.id} {...school} />;
            })}
          </div>
        </div>
      </main>
    </section>
  );
};

export default Schools;
