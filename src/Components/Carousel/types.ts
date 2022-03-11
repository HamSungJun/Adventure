import { ReactNode } from "react";

export interface ICarouselProps {
  useControls?: boolean;
  children: ReactNode;
}

export interface ICarouselControlsProps {
  slideCount: number;
  currentPage: number;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  onSlideThumbClick: (index: number) => void;
}
