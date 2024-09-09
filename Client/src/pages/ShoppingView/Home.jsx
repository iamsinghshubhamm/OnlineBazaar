import React, { useState, useEffect } from "react";
import firstImage from "../../assets/firstHeaderImage.png";
import secondImage from "../../assets/secondHeaderImage.png";
import fourthImage from "../../assets/fourthImage.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import useImageSlideshow from "@/hooks/useImageSlideshow";
import ImageCarausal from "@/hooks/ImageCaraousal";
import HomeProductList from "./HomeProductList";
import Footer from "./Footer";
import Incentives from "./Incentive";

const Home = () => {
  const images = [firstImage, secondImage];
  const [currentImage, fade] = useImageSlideshow(images, 4000, 500);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once : true
    });
  }, []);

  return (
    <div className=" w-full max-w-[1280px] mx-auto h-full flex justify-center items-center relative top-6 p-5 ">
      <div className="flex flex-col">
        <div className="relative">
          <img
            src={currentImage}
            alt="Slideshow"
            className={`w-full h-[200px] sm:h-auto object-cover transition-opacity duration-1000 ease-in-out ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 ">
          <div className="relative" data-aos="fade-right">
            <img
              src={fourthImage}
              alt="Second Slide"
              className="w-full max-w-[500px] h-[300px] rounded-md sm:h-[500px] object-cover"
            />
          </div>

          <div
            className="flex justify-center items-center"
            data-aos="fade-left"
          >
            <div className="p-8 rounded-lg">
              <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl mb-4 sm:mb-14 font-thin">
              Welcome To Store
              </h2>
              <p className="text-gray-600 text-[17px] sm:text-[20px] md:text[24px] mb-4">
              Summer clothes are light, breathable, and cool, perfect for warm days. Winter clothes are cozy, layered, and warm, ideal for keeping the cold at bay while staying comfortable and stylish.
              </p>
              <button className="px-6 text-[14px] sm:text-[16px] md:text-[18px] py-3 bg-gray-900 text-gray-50 rounded-lg hover:bg-blue-600 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <HomeProductList/>
        {/* <ImageCarausal/> */}
        <Incentives/>
        <Footer/>

      </div>
    </div>
  );
};

export default Home;
