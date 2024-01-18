import { useState, useEffect } from "react";

import HikingSvg from "/assets/images/undraw_hiking_re_k0bc.svg";
import BaseballSvg from "/assets/images/undraw_home_run_acyh.svg";
import SkateboardSvg from "/assets/images/undraw_skateboarding_-929-d.svg";
import BikeSvg from "/assets/images/undraw_bike_ride_7xit.svg";
import DroneRaceSvg from "/assets/images/undraw_drone_race_-0-sim.svg";

const svgs = [HikingSvg, BaseballSvg, SkateboardSvg, BikeSvg, DroneRaceSvg];

const LoginDesign = (props: {
  className: string;
  headlineTextId: string;
  svgId: string;
  activityName: string;
}) => {
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0);
  const [headlineText, setHeadlineText] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSvgIndex((prevIndex) => (prevIndex + 1) % svgs.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    switch (currentSvgIndex) {
      case 0:
        setHeadlineText("Go Hiking!");
        break;
      case 1:
        setHeadlineText("Play Baseball!");
        break;
      case 2:
        setHeadlineText("Go Skateboarding!");
        break;
      case 3:
        setHeadlineText("Go Cycling!");
        break;
      case 4:
        setHeadlineText("Go Drone Racing!");
        break;
      default:
        setHeadlineText("");
    }
  }, [currentSvgIndex]);

  return (
    <div className={props.className}>
      <h1 id={props.headlineTextId}>
        Get up. Get together.{" "}
        <span className={props.activityName} color="#4238DA">
          &nbsp;{headlineText}
        </span>
      </h1>
      <img
        id={props.svgId}
        src={svgs[currentSvgIndex]}
        alt={`svg-${currentSvgIndex}`}
      />
    </div>
  );
};

export default LoginDesign;
