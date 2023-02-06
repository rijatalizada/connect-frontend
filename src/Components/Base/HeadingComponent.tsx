import React, { useRef, useState } from "react";

const HeadingComponent = ({
  url,
  headingText,
  setSearch,
  search,
  isSearching,
}: {
  url: string;
  headingText: string;
  setSearch: (search: string) => void;
  search: string;
  isSearching: boolean;
}) => {
  const label = useRef<HTMLLabelElement>(null);

  return (
    <div className="w-full max-h-[26rem] relative flex justify-center text-center">
      <div
        className="relative w-full h-[30rem] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:bg-[#000] before:opacity-[0.3] after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[rgba(26,26,26,0.5)]"
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="absolute z-10 top-32 font-black">
        <p className="text-white text-[3.5rem] font-black">{headingText}</p>
        {isSearching && (
          <div id="course-search" className="relative">
            <input
              type="text"
              name="search"
              id="search-course"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-3 p-3 border-b-2 bg-transparent outline-none text-white "
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeadingComponent;
