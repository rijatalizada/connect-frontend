import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Base/Footer";
import Nav from "../Components/Base/Nav";

const Layout = () => {
  return (
    <div>
      <Nav />
      <div className="content">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
