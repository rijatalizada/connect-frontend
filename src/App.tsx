import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Footer from "./Components/Base/Footer";
import Nav from "./Components/Base/Nav";
import DiscussionDetail from "./Pages/Discussion/DiscussionDetail";
import About from "./Pages/About";
import Courses from "./Pages/Courses";
import Discussions from "./Pages/Discussion/Discussions";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound";
import Schools from "./Pages/Schools";
import CreateDiscussion from "./Pages/Discussion/CreateDiscussion";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Layout from "./Pages/Layout";
import getCookie from "./CustomHooks/getCookies";
import Users from "./Pages/Users";
import Modal from "./Components/Base/Modal";
import { useSelector } from "react-redux";
import { StoreType } from "./redux/store";
import Profile from "./Pages/Users/Profile";
import UpdateUser from "./Pages/Users/UpdateUser";
import SearchUsers from "./Pages/Users/SearchUsers";
import User from "./Pages/Users/User";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { data, isOkay } = getCookie("user");
  const { isOpen, title, success } = useSelector(
    (state: StoreType) => state.modal
  );

  useEffect(() => {
    if (isOkay) {
      // console.log(data);
    }
  }, [data]);

  return (
    <Router>
      <section className="App overflow-x-hidden min-h-screen flex flex-col">
        <main className="h-max flex-grow">
          {isOpen && <Modal isOpen={isOpen} title={title} success={success} />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/schools" element={<Schools />} />
              <Route path="/school/courses/:id" element={<Courses />} />
              <Route
                path="/school/courses/discussions/:courseId"
                element={<Discussions />}
              />
              <Route path="/discussion/:id" element={<DiscussionDetail />} />
              <Route
                path="/discussion/create/:courseId"
                element={<CreateDiscussion />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user/:id" element={<User/>} />
              <Route path="/updateUser/:id" element={<UpdateUser />} />
              <Route path="/searchUsers" element={<SearchUsers/>} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </main>
      </section>
    </Router>
  );
}

export default App;
