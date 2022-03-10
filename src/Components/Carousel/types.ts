import { ReactNode } from "react";

export interface ICarouselProps {
  useControls?: boolean;
  onResize?: () => void;
  children: ReactNode;
}
