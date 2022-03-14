import Carousel from "@/Components/Carousel";
import Novel from "@/Components/Carousel/Novel";
import { useEffect, useState } from "react";
import { throttle } from "lodash-es";
import "./index.scss";

export default function CarouselContainer() {
  const [novelCountPerSlide, setNovelCountPerSlide] = useState(4);
  const [novelCountPerSlide2, setNovelCountPerSlide2] = useState(6);

  const createNovelCarouselSlide = (
    pageCount: number,
    itemCount: number,
    slideClass: string,
  ) => {
    return Array.from(new Array(pageCount), (_, i) => (
      <div key={i} className={slideClass}>
        {Array.from(new Array(itemCount), (_, i) => (
          <Novel key={i} />
        ))}
      </div>
    ));
  };
  useEffect(() => {
    const handleWindowResize = throttle(
      () => {
        const windowInnerWidth = window.innerWidth;
        if (windowInnerWidth > 1500) {
          setNovelCountPerSlide(4);
          setNovelCountPerSlide2(6);
        } else {
          setNovelCountPerSlide(3);
          setNovelCountPerSlide2(5);
        }
      },
      150,
      {
        leading: true,
        trailing: true,
      },
    );
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <div
      style={{
        maxWidth: "1200px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          marginBottom: "20px",
          backgroundColor: "#f5f5f5",
          padding: "20px",
        }}
      >
        <h2>UseControls: false</h2>
        <Carousel useControls={false}>
          {createNovelCarouselSlide(
            2,
            novelCountPerSlide2,
            "carousel-slide-box2",
          )}
        </Carousel>
      </div>
      <div
        style={{
          width: "100%",
          marginBottom: "20px",
          backgroundColor: "#f5f5f5",
          padding: "20px",
        }}
      >
        <h2>SlideCount: 1</h2>
        <Carousel>
          {createNovelCarouselSlide(
            1,
            novelCountPerSlide2,
            "carousel-slide-box2",
          )}
        </Carousel>
      </div>
      <div
        style={{
          width: "100%",
          marginBottom: "20px",
          backgroundColor: "#f5f5f5",
          padding: "20px",
        }}
      >
        <h2>ItemCount: 6 - 5</h2>
        <Carousel>
          {createNovelCarouselSlide(
            2,
            novelCountPerSlide2,
            "carousel-slide-box2",
          )}
        </Carousel>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          marginBottom: "20px",
          backgroundColor: "#f5f5f5",
          padding: "20px",
        }}
      >
        <div style={{ width: "50%" }}>
          <Carousel>
            {createNovelCarouselSlide(
              5,
              novelCountPerSlide,
              "carousel-slide-box",
            )}
          </Carousel>
        </div>
        <div style={{ width: "50%" }}>
          <Carousel>
            {createNovelCarouselSlide(
              5,
              novelCountPerSlide,
              "carousel-slide-box",
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
