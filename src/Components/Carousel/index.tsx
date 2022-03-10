import { useEffect, useRef, useState } from "react";
import { ICarouselProps } from "./types";
import "./index.scss";
export default function Carousel({ children }: ICarouselProps) {
  const [translateX, setTranslateX] = useState(0);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const carouselContentsRef = useRef<HTMLDivElement | null>(null);

  const onPrevSlideClick = () => {
    const nextTranslateX = Math.min(0, translateX + 400);
    if (nextTranslateX === 0) {
      setPrevDisabled(true);
    }
    setTranslateX(nextTranslateX);
  };

  const onNextSlideClick = () => {
    const nextTranslateX = translateX - 400;
    setTranslateX(nextTranslateX);
  };

  useEffect(() => {
    if (
      carouselRef &&
      carouselRef.current &&
      carouselRef.current instanceof HTMLDivElement &&
      carouselContentsRef &&
      carouselContentsRef.current &&
      carouselContentsRef.current instanceof HTMLDivElement
    ) {
      const carouselClientWidth = carouselRef.current.clientWidth;
      const carouselContentsScrollWidth =
        carouselContentsRef.current.scrollWidth;
      if (carouselClientWidth < carouselContentsScrollWidth) {
        setNextDisabled(false);
      }
    }
  }, []);

  useEffect(() => {
    if (translateX < 0) {
      setPrevDisabled(false);
    }
  }, [translateX]);

  return (
    <div ref={carouselRef} className="carousel">
      <div
        ref={carouselContentsRef}
        style={{ transform: `translateX(${translateX}px)` }}
        className="carousel__contents"
      >
        {children}
      </div>
      <div className="carousel__controls">
        <button
          onClick={onPrevSlideClick}
          className="carousel__controls__button button--prev"
          disabled={prevDisabled}
        >
          &lt;
        </button>
        <button
          onClick={onNextSlideClick}
          className="carousel__controls__button button--next"
          disabled={nextDisabled}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
