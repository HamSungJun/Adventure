import { MutableRefObject, useEffect, useRef, useState } from "react";
import { ICarouselProps } from "./types";
import "./index.scss";

export default function Carousel({
  useControls = true,
  onResize,
  children,
}: ICarouselProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateDx, setTranslateDx] = useState(0);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const carouselContentsRef = useRef<HTMLDivElement | null>(null);
  const carouselContentsInnerRef = useRef<HTMLDivElement | null>(null);

  const isRefsInitialized = (
    refs: MutableRefObject<HTMLDivElement | null>[],
  ) => {
    return refs.every(
      (ref) => ref && ref.current && ref.current instanceof HTMLDivElement,
    );
  };

  const onPrevSlideClick = () => {
    setTranslateX(Math.min(0, translateX + translateDx));
  };

  const onNextSlideClick = () => {
    setTranslateX(translateX - translateDx);
  };

  const updateTranslateDx = (slideWidth: number) => {
    console.log(slideWidth);
    setTranslateDx(slideWidth);
  };

  useEffect(() => {
    const checkPrevButtonAvailable = () => {
      setPrevDisabled(translateX === 0);
    };

    const checkNextButtonAvailable = () => {
      if (
        isRefsInitialized([
          carouselRef,
          carouselContentsRef,
          carouselContentsInnerRef,
        ])
      ) {
        const carouselClientWidth = carouselRef.current!.clientWidth;
        const carouselContentsInnerScrollWidth =
          carouselContentsInnerRef.current!.scrollWidth;
        setNextDisabled(
          carouselClientWidth >= carouselContentsInnerScrollWidth,
        );
      }
    };
    checkPrevButtonAvailable();
    checkNextButtonAvailable();
  }, [translateX, carouselRef, carouselContentsRef, carouselContentsInnerRef]);

  useEffect(() => {
    if (isRefsInitialized([carouselContentsRef])) {
      updateTranslateDx(
        parseFloat(getComputedStyle(carouselContentsRef.current!).width),
      );
    }
  }, [carouselContentsRef, carouselContentsRef.current?.clientWidth]);

  useEffect(() => {
    const onWindowResize = () => {
      updateTranslateDx(
        parseFloat(getComputedStyle(carouselContentsRef.current!).width),
      );
      onResize?.();
    };
    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [onResize]);

  return (
    <div ref={carouselRef} className="carousel">
      <div ref={carouselContentsRef} className="carousel__contents">
        <div
          ref={carouselContentsInnerRef}
          style={{ transform: `translateX(${translateX}px)` }}
          className="carousel__contents__inner"
        >
          {children}
        </div>
      </div>
      {useControls && (
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
      )}
    </div>
  );
}
