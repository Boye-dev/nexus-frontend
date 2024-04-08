import { Box } from "@mui/material";
import React, { useState } from "react";
import "../../styles/home.css";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useEffect } from "react";
const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const moveLeft = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  React.useEffect(() => {
    setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);
  }, []);
  const moveRight = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Rearrange the array based on the active index
  const rearrangedItems = [
    ...items.slice(activeIndex),
    ...items.slice(0, activeIndex),
  ];

  return (
    <>
      <div className="carousel">
        <Box
          onClick={moveLeft}
          variant="contained"
          style={{
            position: "sticky",
            left: 0,
            backgroundColor: "#ED2228",
            width: "30px",
            height: "30px",
            zIndex: "10",
            borderRadius: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <ArrowBack sx={{ color: "white" }} />
        </Box>
        <div className="carousel-items">
          {rearrangedItems.map((item, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                opacity: index === Math.floor(items.length / 2) ? 1 : 0.3,
                right: `${index * 30}px`,
                height:
                  index > 0 && index < Math.floor(items.length / 2)
                    ? `${350 - index * 10}px`
                    : index > Math.floor(items.length / 2)
                    ? `${350 - index * 20}px`
                    : index === 0
                    ? `${300 - index * 10 - 20}px`
                    : "400px",

                zIndex: index === Math.floor(items.length / 2) ? 5 : 0,
              }}
              className={
                index === Math.floor(items.length / 2) ? "active item" : "item"
              }
            >
              <img
                src={item}
                width="110%"
                height="110%"
                alt=""
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
          <Box
            onClick={moveRight}
            variant="contained"
            style={{
              position: "sticky",
              right: 0,
              backgroundColor: "#ED2228",
              width: "30px",
              height: "30px",
              zIndex: "10",
              borderRadius: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <ArrowForward sx={{ color: "white" }} />
          </Box>
        </div>
      </div>
    </>
  );
};

export default Carousel;
