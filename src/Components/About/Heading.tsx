import React from "react";
import useFetch from "../../CustomHooks/useFetch";

const url = "https://localhost:44336/api/AboutContent/GetHeader/1";
const imageUrl =
  "https://firebasestorage.googleapis.com/v0/b/connectimages-7c610.appspot.com/o/1200091.jpg?alt=media&token=fa6f4dc1-a832-487c-83dc-24b830ee4114";

const Heading = () => {
  const [data, loading, error] = useFetch(url);

  return <div className="w-full h-full grid grid-cols-2">
    <div className="content  h-full w-full"></div>
    <div className="img h-full w-full">
        <img src={imageUrl} alt="" />
    </div>
  </div>;
};

export default Heading;
