import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import img from '../assets/images/logoSpon.jpg'; // Import your image here

import LocationSelect from "../components/Modal/LocationSelect";

export default function WelcomeScreen() {
  const [ring1Style, setRing1Style] = useSpring(() => ({ padding: "0px" }));
  const [ring2Style, setRing2Style] = useSpring(() => ({ padding: "0px" }));
  const [textStyle, setTextStyle] = useSpring(() => ({ fontSize: "1vh" }));
  const [imageStyle, setImageStyle] = useSpring(() => ({
    transform: "translateY(100%)",
    opacity: 0, // Initial state to hide the image
  }));
  const [open, setOpen] = useState();
  const navigate = useNavigate(false);

  useEffect(() => {
    setTimeout(() => {
      setRing1Style({ padding: "2.4vh" }); // Assuming hp(5) is roughly 5vh
    }, 250);
    setTimeout(() => {
      setRing2Style({ padding: "3.8vh" }); // Assuming hp(5) is roughly 5vh
    }, 350);
    setTimeout(() => {
      setTextStyle({ fontSize: "5.2vh" }); // Animate text size from small to large
    }, 550);
    setTimeout(() => {
      setImageStyle({ transform: "translateY(0%)", opacity: 1 }); // Animate image from bottom to position and make it visible
    }, 800);
    setTimeout(() => navigate("/home"), 5500);
  }, [setRing1Style, setRing2Style, setTextStyle, setImageStyle, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#63247d] space-y-10">
      <animated.div className="bg-white bg-opacity-20 rounded-full mx-2" style={ring2Style}>
        <animated.div className="bg-white bg-opacity-20 rounded-full" style={ring1Style}>
          <animated.div style={textStyle} className="text-white font-bold tracking-widest">
            Pickupiko
          </animated.div>
        </animated.div>
      </animated.div>
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-white font-bold tracking-widest" style={{ fontSize: "4vh" }}>
          SIA
        </h1>
        <p className="text-white font-medium tracking-widest" style={{ fontSize: "2vh" }}>
          Sia is always right
        </p>
        <p className="text-white font-medium tracking-widest" style={{ fontSize: "2vh" }}>
          Sponsored by
        </p>
        <animated.img
          src={img}
          alt="Logo"
          style={imageStyle}
          className="w-64 h-28" // Adjust the size and spacing as needed
        />
      </div>
    </div>
  );
}
