import {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ICarouselProps } from "./types";
import "./index.scss";

export default function Carousel({
  useControls = true,
  onResize,
  children,
}: ICarouselProps) {
  const [translateX, setTranslateX] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
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
    setPageIndex(Math.max(0, pageIndex - 1));
  };

  const onNextSlideClick = () => {
    setPageIndex(Math.min(pageIndex + 1, slideCount));
  };

  const moveSlideToView = useCallback((pageIndex: number) => {
    if (!isRefsInitialized([carouselContentsInnerRef])) return;
    const slideItem = carouselContentsInnerRef
      .current!.querySelectorAll(".carousel-slide-box")
      .item(pageIndex);
    if (slideItem) {
      slideItem.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  }, []);

  useEffect(() => {
    if (isRefsInitialized([carouselContentsInnerRef])) {
      setSlideCount(carouselContentsInnerRef.current!.childElementCount);
      setNextDisabled(slideCount <= 1);
    }
  }, [slideCount, carouselContentsInnerRef]);

  useEffect(() => {
    moveSlideToView(pageIndex);
  }, [pageIndex, slideCount, moveSlideToView]);

  useEffect(() => {
    const onWindowResize = () => {
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
          style={{ transform: `translate3d(${translateX}, 0, 0)` }}
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
            disabled={pageIndex === 0}
          >
            &lt;
          </button>
          <button
            onClick={onNextSlideClick}
            className="carousel__controls__button button--next"
            disabled={pageIndex === slideCount - 1}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
