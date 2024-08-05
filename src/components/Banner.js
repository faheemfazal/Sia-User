import { Header, Hero } from "../components";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper/modules';
import { data } from "../data/data";
import { useEffect, useState } from "react";
import { getBanner } from "../Api/banner";

const Banner = () => {

  const [images, setImages] = useState([]); // State to hold fetched images

  // Function to fetch images
  const fetchImages = async () => {
    try {
      const response = await getBanner(); // Replace with your actual API endpoint
      setImages(response.data.banner);
      console.log(response,'respo....'); // Assuming the API returns an array of image data
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images on component mount
  }, []);

  return (
    <Swiper
      spaceBetween={30}
      speed={3000}
      height={30}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      effect={"fade"}
      fadeEffect={{ crossFade: true }}
      modules={[Autoplay, EffectFade]}
      className="mySwiper h-36 md:h-64" // Add height classes here
    >
      {images.map((data,index) => (
        <SwiperSlide 
          key={data._id} 
          style={{ backgroundColor: `${index%2==0 ? "#d3dce0" : "#dcdfc0"}` }} 
          className="w-full h-36 md:h-64 flex flex-col  "
        >
          {/* <Header colorDeep={colorDeep} /> */}
          <Hero 
         
            img={data.bannerImage}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Banner;
