import React, { useState } from 'react';
import './ImageSlider.css'; // Подключите свой CSS файл

const ImageSlider = ({ allImagesForOneItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? allImagesForOneItem.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === allImagesForOneItem.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-slider">
      <button className="image-slider__button image-slider__button--prev" onClick={handlePrevClick}>
        &#10094;
      </button>
      <div className="image-slider__wrapper">
        <img
          className="image-slider__image"
          src={allImagesForOneItem[currentIndex].location}
          alt={`Slide ${currentIndex}`}
        />
      </div>
      <button className="image-slider__button image-slider__button--next" onClick={handleNextClick}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;