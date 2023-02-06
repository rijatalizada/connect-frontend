import React, { useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../CustomHooks/useFetch";
import setCookie from "../../CustomHooks/setCookie";
import axios from "axios";
import RemoveCookie from "../../CustomHooks/removeCookie";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setTitle, toggleModal } from "../../features/modal/modalSlice";

const url = "https://localhost:44336/api/Auth";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      login: login,
      password: password,
    };

    try {
      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(data),
      });

      const res = await request.json();

      if (res.message === null) {
        setIsError(false);
        RemoveCookie("user");
        setCookie("user", JSON.stringify(res), 1);
        navigate('/');
        dispatch(toggleModal(true));
        dispatch(setTitle("User Successfully Logged In"));
      } else{
        setError(res.message);
        setIsError(true);
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("Network Error");
      } 
    } finally {
      setLogin("");
      setPassword("");

    }
  };

  const passwordInput = useRef<HTMLInputElement>(null)

  const setPasswordType = () => {
    passwordInput.current!.type = passwordInput.current!.type === "password" ? "text" : "password";
  }


  return (
    <div className="grid vs:grid-cols-1 lg:!grid-cols-[30%,80%]">
      <div
        style={{
          backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/connectimages-7c610.appspot.com/o/loginImg.jpg?alt=media&token=4a55322f-7a6b-41d0-9519-295c49edb5b3)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
        className="relative vs:hidden lg:!block"
      >
        {/* <div className="absolute left-0 top-0 w-full h-full bg-cover bg-center bg-black opacity-[0.2] "></div> */}
        <div className="p-6">
          <Link to={"/"} className="cursor-pointer w-full"> <span></span>
            <img
              className="w-[10rem] z-10 "
              src="https://firebasestorage.googleapis.com/v0/b/connectimages-7c610.appspot.com/o/Connect(logo).png?alt=media&token=780d0634-6cf9-45cd-b06f-832256f06d00"
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className="bg-color-primary w-full h-[100vh] flex items-center justify-center text-white">
        <div>
          <p className="text-[1.3rem]">
            Make <span className="font-bold">Connect</span>ion with others
            <span className="block">easier by logging in!</span>
          </p>
          <div className="navigation flex">
            <Link to="/login" className="">
              <p className="mt-5 text-color-secondary border-b-2 pb-2 mr-4">
                Login
              </p>
            </Link>
            <Link to="/register" className="">
              <p className="mt-5 text-color-secondary border-b-2 pb-2 opacity-[0.7]">
                Register
              </p>
            </Link>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="block my-3 rounded-md  text-color-primary p-2 text-[1rem] w-[20rem] focus:outline-none "
              placeholder="E-mail Address or Username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" text-color-primary  my-3 rounded-md p-2 text-[1rem] w-[20rem] focus:outline-none "
              placeholder="Password"
              ref={passwordInput}
            />
            <AiOutlineEyeInvisible className="inline mx-4 cursor-pointer" onClick={() => setPasswordType()}/>
            {isError && (<span className="text-[red] block my-2">{error}</span>)}
            <button
              type="submit"
              className="my-2 block bg-color-secondary py-2 px-9 text-color-primary rounded-md  "
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
