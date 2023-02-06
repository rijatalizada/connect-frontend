import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useFetch from "../../CustomHooks/useFetch";
import "swiper/css";
import './Home.css'

import { Autoplay } from "swiper";
import Titles from "./Titles";
import JoinDiscussion from "./JoinDiscussion";
import { HeaderImages } from "../../Types";
import Loading from "../Base/Loading";

const url = "https://localhost:44336/api/HeaderSliders/getAllHeaderItems";

const HeaderSlider = () => {
  const [headerImages, loading, error] = useFetch(url);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>An Error occured, please comeback later :(</div>;
  }

  return (
    <div className="relative w-full h-[48rem]">
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        loop={true}
        className="h-full "
      >
        {headerImages!.map((item: HeaderImages) => {
          return (
            <SwiperSlide key={item.id}>
              <div className="block w-full h-full">
                <div
                  style={{ backgroundImage: `url(${item.image})` }}
                  className="h-full relative bg-cover w-full bg-[center_center] bg-no-repeat box-border z-[1] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:bg-[#000] before:opacity-[0.3] after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[rgba(0,0,0,0.3)]"
                ></div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div id="header_card" className="">
        <Titles />
        <JoinDiscussion/>
      </div>
    </div>
  );
};

export default HeaderSlider;
