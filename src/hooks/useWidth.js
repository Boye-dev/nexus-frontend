import { useState } from "react";
import { useEffect } from "react";

export const useWidth = () => {
  const [width, setWidth] = useState(1000);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  useEffect(() => {
    if (width < 900) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);
  return { width, isMobile };
};
