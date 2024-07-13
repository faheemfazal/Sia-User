import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import img from '../assets/images/logoSpon.png'; // Ensure correct import path

export default function WelcomeScreen() {
  const [ring1Style, setRing1Style] = useSpring(() => ({ padding: "0px" }));
  const [ring2Style, setRing2Style] = useSpring(() => ({ padding: "0px" }));
  const [textStyle, setTextStyle] = useSpring(() => ({ fontSize: "1vh" }));
  const [imageStyle, setImageStyle] = useSpring(() => ({
    transform: "translateY(100%)",
  }));
  const navigate = useNavigate();

  useEffect(() => {
    // Animate image from bottom to position slowly
    setTimeout(() => {
      setImageStyle({ transform: "translateY(0%)" });
    }, 1000); // Delayed start for slower animation

    // Sequentially animate other elements
    setTimeout(() => {
      setRing1Style({ padding: "2.4vh" });
    }, 1200);
    setTimeout(() => {
      setRing2Style({ padding: "3.8vh" });
    }, 1400);
    setTimeout(() => {
      setTextStyle({ fontSize: "5.2vh" });
    }, 1600);

    // Navigate to home screen after animations complete
    setTimeout(() => navigate("/home"), 3000);
  }, [setRing1Style, setRing2Style, setTextStyle, setImageStyle, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#63247d] space-y-10">
      {/* Animated elements */}
      <animated.div className="bg-white bg-opacity-20 rounded-full mx-2" style={ring2Style}>
        <animated.div className="bg-white bg-opacity-20 rounded-full" style={ring1Style}>
          <animated.div style={textStyle} className="text-white font-bold tracking-widest">
            Pickupiko.com
          </animated.div>
        </animated.div>
      </animated.div>
      
      {/* Non-animated elements */}
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-white font-bold tracking-widest" style={{ fontSize: "4vh" }}>
          SIA
        </h1>
        <p className="text-white font-medium tracking-widest" style={{ fontSize: "2vh" }}>
          Sia is always right
        </p>
        
        {/* Animated image */}
        <img
          src={img}
          alt="Logo"
          style={imageStyle}
          className="w-40 h-auto mt-5" // Adjusted sizing for responsiveness
        />
      </div>
    </div>
  );
}
