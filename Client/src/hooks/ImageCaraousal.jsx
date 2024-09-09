import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import firstImage from "../assets/caraousal1.jpg";
import secondImage from "../assets/caraousal2.jpg";
import thirdImage from "../assets/caraousal3.jpg";

const ImageCarousel = () => {
  const images = [firstImage, secondImage, thirdImage];
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Carousel
      selectedItem={currentSlide}
      onChange={(index) => setCurrentSlide(index)}
      showThumbs={false}
      infiniteLoop
      autoPlay
      interval={3000}
      stopOnHover
    >
      {images.map((image, index) => (
        <div key={index} className="relative w-full h-[300px] mt-10 hover:font-semibold ">
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover "
          />

          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white hover:font-bold z-10">
            <p className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold uppercase">
              Special Discount On Women's Clothing
            </p>
            <h1 className="text-[17px] sm:text-[20px] md:text-[25px]  font-bold mt-4">
              SAVE UPTO 27% OFF
            </h1>
            <button className="mt-6 px-6 py-3 text-[14px] sm:text-[15px] md:text-[18px] bg-gray-800 text-white rounded-lg text-sm font-bold hover:bg-gray-950 hover:text-white transition duration-300">
              Grab Offer
            </button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
