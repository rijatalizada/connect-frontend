import React, { useEffect, useState } from "react";
import useFetch from "../../CustomHooks/useFetch";
import BurgerToggle from "./BurgerToggle";
import { Link, NavLink } from "react-router-dom";
import getCookie from "../../CustomHooks/getCookies";
import removeCookie from "../../CustomHooks/removeCookie";
import { AiFillHome } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { IoSchoolSharp } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import "./Nav.css";

const url = "https://localhost:44336/api/Constants/getConsntans";

const Nav = () => {
  const [logo, setLogo] = useState<string>("");
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isActive, setIsActive] = useState<boolean>(false);

  const { isOkay } = getCookie("user");

  const getLogo = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setLogo(data.logoURL);
  };

  useEffect(() => {
    getLogo();
  }, [url]);

  const detectWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", detectWidth);
    if (windowWidth > 768) {
      setIsActive(false);
    }
    return () => {
      window.removeEventListener("resize", detectWidth);
    };
  }, [windowWidth]);

  const signOut = () => {
    removeCookie("user");
    window.location.reload();
  };

  return (
    <nav className="shadow-xl  z-50 bg-color-secondary">
      <div className="py-3 px-10 x-10 md:mx-auto  items-center grid grid-cols-2">
        <div className="logo">
          <img className="w-[12rem]" src={logo} alt="logo" />
        </div>
        <div
          className={`nav-links ${windowWidth <= 768 && "flex justify-end"} `}
        >
          {windowWidth > 768 ? (
            <ul className="list-none flex items-center justify-between">
              <li className="text-color-primary text-[1.2rem] font-bold">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "active-link relative flex items-center"
                      : "flex items-center"
                  }
                >
                  HOME <AiFillHome className="ml-2" />
                </NavLink>
              </li>
              <li className="text-color-primary text-[1.2rem] font-bold">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "active-link relative flex items-center"
                      : "flex items-center"
                  }
                >
                  ABOUT <FcAbout className="ml-2" />
                </NavLink>
              </li>
              <li className="text-color-primary text-[1.2rem] font-bold">
                <NavLink
                  to="/schools"
                  className={({ isActive }) =>
                    isActive
                      ? "active-link relative flex items-center"
                      : "flex items-center"
                  }
                >
                  SCHOOLS <IoSchoolSharp className="ml-2" />
                </NavLink>
              </li>
              <li className="text-color-primary text-[1.2rem] font-bold">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "active-link relative flex items-center"
                      : "flex items-center"
                  }
                >
                  PROFILE <AiOutlineUser className="ml-2" />
                </NavLink>
              </li>
              {!isOkay ? (
                <li className="text-color-secondary bg-color-primary p-2 rounded-md text-[1.2rem] font-bold">
                  <Link to="/register">REGISTER</Link>
                </li>
              ) : (
                <li className="text-color-secondary bg-color-primary p-2 rounded-md text-[1.2rem] font-bold">
                  <button onClick={() => signOut()}>SIGN OUT</button>
                </li>
              )}
            </ul>
          ) : (
            <BurgerToggle setIsActive={setIsActive} isActive={isActive} />
          )}
        </div>
      </div>
      <ul
        className={`relative bg-white w-full duration-[0.9s] list-none  flex flex-col items-center justify-between ${
          isActive ? "h-[20rem] " : "h-0 "
        } `}
      >
        <li
          className={`text-color-primary ${
            isActive ? "block" : "hidden"
          }   my-2 text-[1.2rem] font-bold`}
        >
          <Link to="/" className="flex items-center">
            HOME <AiFillHome className="ml-2" />
          </Link>
        </li>
        <li
          className={`text-color-primary ${
            isActive ? "block" : "hidden"
          }  my-2 text-[1.2rem] font-bold`}
        >
          <Link to="/about" className="flex items-center">
            ABOUT <FcAbout className="ml-2" />
          </Link>
        </li>
        <li
          className={`text-color-primary ${
            isActive ? "block" : "hidden"
          }   my-2 text-[1.2rem] font-bold`}
        >
          <Link to="/schools" className="flex items-center">
            SCHOOLS <IoSchoolSharp className="ml-2" />
          </Link>
        </li>
        <li
          className={`text-color-primary ${
            isActive ? "block" : "hidden"
          }   my-2 text-[1.2rem] font-bold`}
        >
          <Link to={"/profile"}>PROFILE</Link>
        </li>
        {!isOkay ? (
          <li
            className={`text-color-secondary my-2 bg-color-primary ${
              isActive ? "block" : "hidden"
            }  p-2 rounded-md text-[1.2rem] font-bold`}
          >
            <Link to="/register">REGISTER</Link>
          </li>
        ) : (
          <li
            className={`text-color-secondary my-2 bg-color-primary ${
              isActive ? "block" : "hidden"
            }  p-2 rounded-md text-[1.2rem] font-bold`}
          >
            <button onClick={() => signOut()}>SIGN OUT</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
