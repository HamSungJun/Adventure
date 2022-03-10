import Carousel from "@/Components/Carousel";
import Novel from "@/Components/Carousel/Novel";
import { useEffect, useState } from "react";
import "./index.scss";

export default function CarouselContainer() {
  const [novelCountPerSlide, setNovelCountPerSlide] = useState(4);
  const handleWindowResize = () => {
    const windowInnerWidth = window.innerWidth;
    if (windowInnerWidth > 1500) {
      setNovelCountPerSlide(4);
    } else {
      setNovelCountPerSlide(3);
    }
  };
  const createNovelCarouselSlide = () => {
    return Array.from(new Array(5), (_, i) => (
      <div key={i} className="carousel-slide-box">
        {Array.from(new Array(novelCountPerSlide), (_, i) => (
          <Novel key={i} />
        ))}
      </div>
    ));
  };
  useEffect(() => {
    handleWindowResize();
  }, []);
  return (
    <div style={{ maxWidth: "1200px", width: "100%", display: "flex" }}>
      <div style={{ width: "50%" }}>
        <Carousel onResize={handleWindowResize}>
          {createNovelCarouselSlide()}
        </Carousel>
      </div>
      <div style={{ width: "50%" }}>
        <Carousel onResize={handleWindowResize}>
          {createNovelCarouselSlide()}
        </Carousel>
      </div>
    </div>
  );
}
