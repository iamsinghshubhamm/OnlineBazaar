import { useState, useEffect } from 'react';

const useImageSlideshow = (images, intervalTime, animationDuration) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Manage current image index
  const [fade, setFade] = useState(true); // For fade animation

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Trigger fade-out

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Switch image
        setFade(true); // Trigger fade-in
      }, animationDuration); // Delay to match fade-out animation

    }, intervalTime); // Change image at the specified interval time

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length, intervalTime, animationDuration]);

  // Return the current image and the fade state
  return [images[currentImageIndex], fade];
};

export default useImageSlideshow;
