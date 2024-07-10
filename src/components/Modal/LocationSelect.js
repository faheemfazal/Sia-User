import React, { useState, useEffect } from "react";
import { getLocations } from "../../Api/LocationAdd";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../Api/redux-toolkit/slice/userReducer";


export default function LocationSelect({ open, setOpen }) {
  const [locations, setLocations] = useState([]);
  const reduxstate = useSelector((state)=>state.userSlice)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const setHub=(location)=>{

      dispatch(setLogin({
          ...reduxstate,
          hub:location
      }))
      navigate("/home")
  }

  // useEffect(() => {
  //   getLocations().then((res) => {
  //     setLocations(res);
  //   });
  // }, []);

  // console.log('location', locations);

  const animationProps = useSpring({
    opacity: open ? 1 : 0,
    transform: open ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.9)',
    config: { tension: 200, friction: 20 },
  });

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 blur-sm z-40"
        onClick={() => setOpen(false)}
      />

      <animated.div style={animationProps} className="fixed top-1/2 left-1/2 z-50 md:w-[450px] md:h-[500px] h-[450px] w-80 bg-white rounded-lg overflow-auto">
        {locations.map((data, i) => (
          <div key={i} className="h-14 w-full flex pl-5 items-center font-semibold text-xl hover:bg-[#ffb524] hover:text-[#81c408]"
          onClick={()=>setHub(data.hubName)}>
            <h1>{data.hubName}</h1>
          </div>
        ))}
      </animated.div>
    </>
  );
}
