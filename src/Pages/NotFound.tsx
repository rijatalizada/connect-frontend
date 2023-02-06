import React from "react";
import { RiPagesLine } from "react-icons/ri";

const NotFound = () => {
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);

  const getWidth = () => {
    setInnerWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener("resize", getWidth);
    return () => {
      window.removeEventListener("resize", getWidth);
    }
  }, [innerWidth]);

  console.log(innerWidth/2);
  

  return (
    <section className={`flex items-center justify-center h-[57vh]`}>
      <p className="text-[6rem] font-bold text-color-primary">Not Found </p>
      <RiPagesLine className="text-color-primary text-[6rem]" />
    </section>
  );
};

export default NotFound;
