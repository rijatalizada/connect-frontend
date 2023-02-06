import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../redux/store";
import { MdOutlineDone, MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { setTitle, toggleModal } from "../../features/modal/modalSlice";

const Modal = ({
  title,
  isOpen,
  success,
}: {
  title: string;
  isOpen: boolean;
  success: boolean;
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen == true) {
      setTimeout(() => {
        dispatch(toggleModal(false));
      }, 5000);
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed top-32 z-[19999999] duration-[.4s]  bg-white right-0 w-[20rem] h-[5rem] flex p-5 items-center overflow-hidden`}
    >
      {success ? (
        <MdOutlineDone className="mr-3 h-[2rem] w-[2rem] text-[#4BB543] text-[1.5rem] border-2 rounded-[50%] border-[#4BB543]" />
      ) : (
        <MdOutlineDoNotDisturbAlt className="mr-3 h-[2rem] w-[2rem] text-[red] text-[1.6rem]"/>
      )}
      <p className="text-color-primary">{title}</p>
    </div>
  );
};

export default Modal;
