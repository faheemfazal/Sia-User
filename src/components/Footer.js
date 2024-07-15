import React,{useState} from 'react';
import {  FaInstagram } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { setLogout } from "../Api/redux-toolkit/slice/userReducer";
import { useNavigate } from 'react-router-dom';
import logo  from '../assets/images/logoWelocome.png'


export default function Footer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem('Token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
    setMenuOpen(!menuOpen);
    localStorage.removeItem('Token');
    navigate('/home'); // Navigate to the login page or any other page after logout
  };
  return (
    <nav className="bg-[#4c1c61] text-[rgba(255,255,255,.5)] p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className=" items-center">
        <img
          src={logo}
          alt="Pickupiko"
          className="h-8 md:h-12" // Adjust height based on text-3xl and text-5xl
        />

          <h1 className="hover:text-white lg:text-xl text-sm text-white">Fresh products</h1>
      
        </div>
        <div className="flex items-center space-x-2">
          {/* <button className="p-2 rounded-full border border-[#ffb524] text-[#ffb524] hover:bg-[#ffb524] hover:text-white transition">
            <FaFacebookF />
          </button> */}
          <a href="https://www.instagram.com/pickupiko?igshid=NHc3NGhjNWV5bHF5" target="_blank" rel="noopener noreferrer">
      <button className="p-2 rounded-full border border-white text-white hover:bg-white hover:text-[#63247d] transition">
        <FaInstagram />
      </button>
    </a>
        </div>
      </div>
      <div className="container mx-auto mt-4">
      {/* <h1 href="#why-us" className=" text-4xl text-white mb-4">Why People Like us!</h1> */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Shop Info</h2>
            <ul className="space-y-2 mt-2">
              <li><a href="#about-us" className="hover:text-white">About Us</a></li>
              {/* <li><a href="#contact-us" className="hover:text-white">Contact Us</a></li> */}
    
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Account</h2>
            <ul className="space-y-2 mt-2">
              <li><a href="#my-account" className="hover:text-white">My Account</a></li>
              <li>  { token &&       <div className="nav-item nav-link hover:text-[#63247d]"onClick={handleLogout}>Logout</div>}
                   </li>
 


            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <p className="mt-2">
            Arts college road, 
RAJAPPANAGAR 
Thanjavur -613007
            </p>
            {/* <p className="mt-2">
              Email: Example@gmail.com
            </p> */}
            <p className="mt-2">
              Phone: +91 8610042353
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
