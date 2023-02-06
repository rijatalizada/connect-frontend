import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Base/Loading";
import getCookie from "../../CustomHooks/getCookies";
import useFetch from "../../CustomHooks/useFetch";
import {
  setTitle,
  toggleModal,
  toggleSuccess,
} from "../../features/modal/modalSlice";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const getUser = "https://localhost:44336/api/Users/GetUser/";
const updateUser = "https://localhost:44336/api/Auth/Update/";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, loading, error] = useFetch(getUser + id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isOkay } = getCookie("user");
  const [token, setToken] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profileImg, setProfileImg] = useState<File>();
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUserName(user.userName);
      setBio(user.bio);
      setProfileImg(user.profileImg);
    }
  }, [loading]);

  useEffect(() => {
    if (isOkay) {
      setToken(data!.token);
    }
  }, [isOkay]);

  const check = () => {
    if (profileImg) {
      const imageRef = ref(storage, `/UsersImage/${profileImg?.name + v4()}`);
      uploadBytes(imageRef, profileImg).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            handleUpdate(url);
        })
      })
    } else {
      handleUpdate(user.profileImg);
    }
  };

  const handleUpdate = async (url: string) => {
    const body = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      bio: bio,
      profileImg: url,
      confirmPassword: confirmPassword,
    };

    try {
      const req = await fetch(updateUser + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const res = req.text();

      if (req.status == 200) {
        navigate("/profile");
        dispatch(toggleModal(true));
        dispatch(setTitle("Profile Successfully Updated"));
        dispatch(toggleSuccess(true));
      } else {
        navigate("/profile");
        dispatch(toggleModal(true));
        dispatch(setTitle(res));
        dispatch(toggleSuccess(false));
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section>
      <header className="h-[10rem] bg-[#00000024] flex items-center justify-center mb-10">
        <p className="text-[2rem] font-triscope">
          Update {user.firstName} {user.lastName}
        </p>
      </header>
      <main className="my-10 container mx-auto  w-full ">
        <div className="bg-white h-[50rem] p-10 shadow-2xl">
          <div>
            <div className="inline-block">
              <label className="text-color-primary text-[1.1rem] font-triscope">
                First Name
              </label>
              <input
                className="mt-2 mb-5 block  p-2 border-2 border-solid border-color-primary rounded-md duration-[0.6s] focus:outline-none focus:border-color-primary"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="inline-block mx-5">
              <label className=" text-color-primary text-[1.1rem] font-triscope">
                Last Name
              </label>
              <input
                className="mt-2 block mb-5  p-2 border-2 border-solid border-color-primary rounded-md duration-[0.6s] focus:outline-none focus:border-color-primary"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="inline-block">
              <label className="text-color-primary text-[1.1rem] font-triscope">
                Username
              </label>
              <input
                className="mt-2 block mb-5  p-2 border-2 border-solid border-color-primary rounded-md duration-[0.6s] focus:outline-none focus:border-color-primary"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label className="text-color-primary text-[1.1rem] font-triscope">
                Bio
              </label>
              <textarea
                id="description"
                name="description"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="form-control block my-3 w-full p-3 h-[14rem] overflow-auto resize-none  border-solid border-[#1d84b5] border-[1px] rounded-md  focus:outline-none"
                placeholder="Description"
                required
              ></textarea>
            </div>
            <input
              onChange={(e) => setProfileImg(e.target.files![0])}
              type="file"
              name=""
              id=""
              className="border-solid border-2 border-[#1d84b5] p-2 rounded-md mr-2"
            />
            <input
              className="mt-5 block mb-5  p-2 border-2 border-solid border-color-primary rounded-md duration-[0.6s] focus:outline-none focus:border-color-primary"
              type="text"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={() => check()}
              className="mt-5 p-2 border-2 border-solid border-[#1d84b5] rounded-md"
            >
              Update
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default UpdateUser;
