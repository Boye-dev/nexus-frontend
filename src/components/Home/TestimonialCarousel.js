import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import "./Carousel.css";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import image from "../../assets/images/test-image.png";
import quote from "../../assets/images/quote.png";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { testimonials } from "../../constants/testimonials";
const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <Box>
      <Grid2 container>
        <Grid2 item xs={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              onClick={handlePrev}
              sx={{
                padding: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#EB2B31",
                borderRadius: "50%",
                cursor: "pointer",
                zIndex: 5,
              }}
            >
              <NavigateBeforeIcon fontSize="large" sx={{ color: "#fff" }} />
            </Box>
          </Box>
        </Grid2>
        <Grid2 item xs={10}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              background: "#FBFBFB",
              padding: "34px 50px 50px",
              boxSizing: "border-box",
              borderRadius: "14px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ width: { xs: "70%", md: "25%" } }}>
                <img src={image} style={{ width: "100%" }} alt="" />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontSize: "48px",
                  marginTop: "6px",
                  color: "#000",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {testimonials[activeIndex].name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  background: "",
                }}
              >
                <Box
                  sx={{
                    width: "60px",
                    height: "3px",
                    backgroundColor: "#EB2B31",
                    borderRadius: "6px",
                    mt: 2,
                    mb: 2,
                    borderBottom: "20px",
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  width: "100%",
                  marginBottom: "9px",
                  color: "#000",
                  fontWeight: 300,
                }}
              >
                {testimonials[activeIndex].text}
              </Typography>

              <img src={quote} alt="" />
            </Box>
          </Box>
        </Grid2>
        <Grid2 item xs={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              onClick={handleNext}
              sx={{
                padding: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#EB2B31",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <NavigateNextIcon fontSize="large" sx={{ color: "#fff" }} />
            </Box>
          </Box>
        </Grid2>
      </Grid2>

      <div className="indicators">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`indicator ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleSlide(index)}
          />
        ))}
      </div>
    </Box>
  );
};

export default TestimonialCarousel;
