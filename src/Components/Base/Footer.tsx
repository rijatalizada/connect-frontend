import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import useFetch from "../../CustomHooks/useFetch";
import { FaSearch } from "react-icons/fa";
import BurgerToggle from "./BurgerToggle";
import Loading from "./Loading";
import { IDiscussion, ISchool } from "../../Types";
import { Link, useLocation } from "react-router-dom";
import PopularDiscussions from "../Footer/PopularDiscussions";
import {
  BsInstagram,
  BsReddit,
  BsTwitter,
  BsFacebook,
  BsWhatsapp,
} from "react-icons/bs";
import "./Footer.css";

const schoolsUrl = "https://localhost:44336/api/Schools/getAllSchools";
const popularDiscussionsUrl =
  "https://localhost:44336/api/Discussions/getTopDiscussions";

const Footer = () => {
  const [schools, loading, error] = useFetch(schoolsUrl);
  const [popularDiscussions] = useFetch(popularDiscussionsUrl);
  const [showSearch, setShowSearch] = useState<boolean>(true);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const detectWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", detectWidth);

    return () => {
      window.removeEventListener("resize", detectWidth);
    };
  }, [windowWidth]);

  if (loading) {
    return <Loading />;
  }

  return (
    <footer className="overflow-x-hidden bg-[#364253]">
      <div className="px-10 py-14 grid 2xl:grid-cols-4 gap-32 xl:grid-cols-2 grid-cols-1">
        <div className="recent-under w-full">
          {/* <p className="text-[2rem] mb-2 text-color-secondary">Recent Posts</p>
          <div className="under py-3 text-color-secondary relative ">
            <p className="post-title mb-1 text-[1.1rem]">
              {" "}
              What Will a Mars habitat look like?
            </p>
            <p className="date text-[0.9rem]">March 8, 2018</p>
          </div>
          <div className="under py-3 text-color-secondary relative ">
            <p className="post-title">
              The Top Tips to Know Before Travelling to Utah
            </p>
            <p className="date text-[0.9rem]">March 3, 2018</p>
          </div>
          <div className="under py-3 text-color-secondary relative ">
            <p className="post-title mb-1 text-[1.1rem]">
              5 Dreamy Stays for Couples in Combodia
            </p>
            <p className="date text-[0.9rem]">March 1, 2018</p>
          </div>
          <div className="under py-3 text-color-secondary relative ">
            <p className="post-title mb-1 text-[1.1rem]">
              The Top Tips to Know Before Travelling to Utah
            </p>
            <p className="date text-[0.9rem]">March 3, 2018</p>
          </div> */}
        </div>
        <div className="popular-discussions">
          <p className="text-[2rem] mb-2 text-color-secondary">
            Popular Discussions
          </p>
          {popularDiscussions.length > 0 ? (
            popularDiscussions.map((discussion: IDiscussion) => {
              return <PopularDiscussions key={discussion.id} {...discussion} />;
            })
          ) : (
            <p className="text-[white] text-[1.2rem]">No Posted Discussions</p>
          )}
        </div>
        <div className="schools">
          <p className="text-[2rem] mb-2 text-color-secondary">Our Schools</p>
          {schools.map((item: ISchool) => {
            return (
              <Link key={item.id} to={`/school/courses/${item.id}`}>
                <div className="under py-3 text-color-secondary relative">
                  <p className="mb-1 text-[1.1rem]">{item.fullname}</p>
                  <p className="text-[0.9rem]">{item.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
        {/* {windowWidth > 1280 ? (
          <div className="search-courses flex flex-col items-start">
            <p className="text-[2rem] mb-4 text-color-secondary">
              Search Course
            </p>
            <div className="search flex w-full items-center">
              <span className="absolute p-[10px] min-w-[40px]">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Course Name"
                className="p-2 w-full text-center focus:outline-0"
              />
            </div>
          </div>
        ) : (
          ""
        )} */}
      </div>
      <div
        id="footer-contact"
        className="contact relative container mx-auto w-full h-[4rem]  "
      >
        <div className="flex justify-center items-center h-full">
          <i className="fa-brands fa-instagram contactInfo text-[1.5rem] mx-3"></i>
          <i className="fa-brands fa-whatsapp contactInfo text-[1.5rem] mx-3"></i>
          <i className="fa-brands fa-facebook contactInfo text-[1.5rem] mx-3"></i>
          <i className="fa-brands fa-twitter contactInfo text-[1.5rem] mx-3"></i>
          <i className="fa-brands fa-reddit contactInfo text-[1.5rem] mx-3"></i>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
