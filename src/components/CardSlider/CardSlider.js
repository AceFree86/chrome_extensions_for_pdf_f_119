import React, { useRef } from "react";
import "./CardSlider.css";
import { IconLeft, IconRight } from "../Icons";

const CardSlider = () => {
  const scrollContainer = useRef(null);
  const slides = [
    {
      title: chrome.i18n.getMessage("cardSlider1Title"),
      text: chrome.i18n.getMessage("cardSlider1Text"),
    },
    {
      title: chrome.i18n.getMessage("cardSlider2Title"),
      text: chrome.i18n.getMessage("cardSlider2Text"),
    },
  ];

  const slideLeft = () => {
    scrollContainer.current.scrollBy({
      left: -213, // Width of one card
      behavior: "smooth",
    });
  };

  const slideRight = () => {
    scrollContainer.current.scrollBy({
      left: 213, // Width of one card
      behavior: "smooth",
    });
  };

  return (
    <div className="body-CardSlider">
      <div className="main-slider-container">
        <div className="slider-icon">
          <div className="slider-icon-height">
            <IconLeft className="slider-icon-style" onClick={slideLeft} />
          </div>

          <div className="slider" ref={scrollContainer}>
            {slides.map((slides, index) => {
              return (
                <div className="slider-card" key={index}>
                  <p className="slider-card-title">{slides.title}</p>
                  <div className="slider-card-container">
                    <p className="slider-card-text">{slides.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="slider-icon-height">
            <IconRight className="slider-icon-style" onClick={slideRight} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
