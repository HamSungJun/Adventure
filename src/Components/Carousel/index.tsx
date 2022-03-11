import {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { ICarouselControlsProps, ICarouselProps } from "./types";
import classNames from "classnames";
import "./index.scss";

export default function Carousel({
  useControls = true,
  children,
}: ICarouselProps) {
  const [translateX, setTranslateX] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

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
    const slideItem =
      carouselContentsInnerRef.current!.children.item(pageIndex);
    if (slideItem && slideItem instanceof HTMLElement) {
      setTranslateX(slideItem.offsetLeft * -1);
    }
  }, []);

  useEffect(() => {
    if (isRefsInitialized([carouselContentsInnerRef])) {
      setSlideCount(carouselContentsInnerRef.current!.childElementCount);
    }
  }, [slideCount, carouselContentsInnerRef]);

  useEffect(() => {
    moveSlideToView(pageIndex);
  }, [pageIndex, slideCount, moveSlideToView]);

  return (
    <div ref={carouselRef} className="carousel">
      <div ref={carouselContentsRef} className="carousel__contents">
        <div
          ref={carouselContentsInnerRef}
          style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
          className="carousel__contents__inner"
        >
          {children}
        </div>
      </div>
      {useControls && (
        <div className="carousel__controls">
          {slideCount > 1 && (
            <CarouselControls
              slideCount={slideCount}
              currentPage={pageIndex}
              onPrevButtonClick={onPrevSlideClick}
              onNextButtonClick={onNextSlideClick}
              onSlideThumbClick={(index) => {
                setPageIndex(index);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

function CarouselControls({
  slideCount,
  currentPage,
  onPrevButtonClick,
  onNextButtonClick,
  onSlideThumbClick,
}: ICarouselControlsProps) {
  return (
    <>
      <button
        onClick={onPrevButtonClick}
        className="carousel__controls__button button--prev"
        disabled={currentPage === 0}
      >
        &lt;
      </button>
      {Array.from(new Array(slideCount), (_, i) => (
        <span
          key={i}
          className={classNames([
            "carousel__controls__thumb",
            { "thumb--active": currentPage === i },
          ])}
          onClick={() => onSlideThumbClick(i)}
        ></span>
      ))}
      <button
        onClick={onNextButtonClick}
        className="carousel__controls__button button--next"
        disabled={currentPage === slideCount - 1}
      >
        &gt;
      </button>
    </>
  );
}
