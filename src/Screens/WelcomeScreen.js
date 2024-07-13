import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import img from '../assets/images/logoSpon.png'; // Import your image here

import LocationSelect from "../components/Modal/LocationSelect";

export default function WelcomeScreen() {
  const [ring1Style, setRing1Style] = useSpring(() => ({ padding: "0px" }));
  const [ring2Style, setRing2Style] = useSpring(() => ({ padding: "0px" }));
  const [textStyle, setTextStyle] = useSpring(() => ({ fontSize: "1vh" }));
  const [imageStyle, setImageStyle] = useSpring(() => ({
    transform: "translateY(100%)",
  }));
  const [open, setOpen] = useState();
  const navigate = useNavigate(false);

  useEffect(() => {
    setTimeout(() => {
      setImageStyle({ transform: "translateY(0%)" }); // Animate image from bottom to position
    }, 500);
    setTimeout(() => {
      setRing1Style({ padding: "2.4vh" }); // Assuming hp(5) is roughly 5vh
    }, 300);
    setTimeout(() => {
      setRing2Style({ padding: "3.8vh" }); // Assuming hp(5) is roughly 5vh
    }, 500);
    setTimeout(() => {
      setTextStyle({ fontSize: "5.2vh" }); // Animate text size from small to large
    }, 700);
  
    setTimeout(() => navigate("/home"), 2500);
  }, [setRing1Style, setRing2Style, setTextStyle, setImageStyle, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen  bg-[#63247d] space-y-10">
      <animated.div
        className="bg-white bg-opacity-20 rounded-full mx-2"
        style={ring2Style}
      >
        <animated.div
          className="bg-white bg-opacity-20 rounded-full"
          style={ring1Style}
        >
          <animated.div
            style={textStyle}
            className="text-white font-bold tracking-widest"
          >
            Pickupiko.com
          </animated.div>
        </animated.div>
      </animated.div>
      <div className="flex flex-col items-center space-y-2">
        <h1
          className="text-white font-bold tracking-widest"
          style={{ fontSize: "4vh" }}
        >
          SIA
        </h1>
        <p
          className="text-white font-medium tracking-widest"
          style={{ fontSize: "2vh" }}
        >
          Sia is always right
        </p>
        <animated.img
          src={img}
          alt="Logo"
          style={imageStyle}
          className="w-40 h-20 mt-5" // Adjust the size and spacing as needed
        />
      </div>
    </div>
  );
}
