import React from "react";
import CounterArea from "@components/common/counter-area";
import { CourseFilter } from "./our-course";
import BannerSlider from "@components/home/banner-slider";
import { heroBanner } from "@data/banner";
import YoutubeLink from "./youtube-link";

const Home = () => {
  return (
    <>
      <BannerSlider
        banner={heroBanner}
        contentClassName="pb-24 xl:pb-32 pt-16 xl:pt-24"
      />
      <CourseFilter />
      <CounterArea />
      <YoutubeLink />
    </>
  );
};

export default Home;
