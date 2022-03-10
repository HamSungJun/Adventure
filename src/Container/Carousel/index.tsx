import Carousel from "@/Components/Carousel";
import Novel from "@/Components/Carousel/Novel";
import "./index.scss";

export default function CarouselContainer() {
  return (
    <Carousel>
      <div className="carousel-slide-box">
        <Novel />
        <Novel />
        <Novel />
      </div>
      <div className="carousel-slide-box">
        <Novel />
        <Novel />
        <Novel />
      </div>
      <div className="carousel-slide-box">
        <Novel />
        <Novel />
        <Novel />
      </div>
      <div className="carousel-slide-box">
        <Novel />
        <Novel />
        <Novel />
      </div>
      <div className="carousel-slide-box">
        <Novel />
        <Novel />
        <Novel />
      </div>
    </Carousel>
  );
}
