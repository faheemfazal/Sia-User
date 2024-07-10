import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <nav className="bg-[#4c1c61] text-[rgba(255,255,255,.5)] p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className=" items-center">
          <h1 className="text-white lg:text-5xl text-2xl font-bold ">Sia</h1>

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
              {/* <li><a href="#shop-details" className="hover:text-white">Shop details</a></li> */}
 
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