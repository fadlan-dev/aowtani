import React, { CSSProperties } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { AspectRatio, Card, Image } from "@mantine/core";

interface IndicatorProps {
  clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void;
  isSelected: boolean;
  index: number;
  label: string;
}

function Banner() {
  const images = ["/banner/1.png", "/banner/2.png", "/banner/3.png", "/banner/4.png"];

  const Indicator = ({ clickHandler, isSelected, index, label }: any) => {
    console.log({ isSelected });
    return (
      <div
        key={index}
        style={{ background: isSelected ? "red" : "white" }}
        className="inline-block w-[8px] h-[8px] rounded-full mx-1"
        onClick={clickHandler}
      >
        {index}
      </div>
    );
  };

  const indicatorStyles: CSSProperties = {
    background: "#fff",
    width: 8,
    height: 8,
    display: "inline-block",
    margin: "0 5px",
    borderRadius: "100%",
    cursor: "pointer",
  };

  return (
    <Carousel
      showThumbs={false}
      autoPlay
      interval={5000}
      showArrows={false}
      infiniteLoop
      showStatus={false}
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        if (isSelected) {
          return (
            <li
              style={{ ...indicatorStyles }}
              className="bg-primary"
              aria-label={`Selected: ${label} ${index + 1}`}
              title={`Selected: ${label} ${index + 1}`}
            />
          );
        }
        return (
          <li
            style={indicatorStyles}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            value={index}
            key={index}
            role="button"
            tabIndex={0}
            title={`${label} ${index + 1}`}
            aria-label={`${label} ${index + 1}`}
          />
        );
      }}
    >
      {images.map((image, index) => (
        <Card
          key={index}
          padding="md"
          className="cursor-pointer hover:shadow transition"
        >
          <Card.Section>
            <Image
              className="bg-zinc-200 object-cover"
              src={image}
              height={300}
              alt={`banner-${index}`}
            />
          </Card.Section>
        </Card>
      ))}
    </Carousel>
  );
}

export default Banner;
