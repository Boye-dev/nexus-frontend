import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = ({ height, width }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={height || "100vh"}
      width={width || "100%"}
    >
      <CircularProgress sx={{ fontSize: 12 }} />
    </Box>
  );
};

export default Loader;
