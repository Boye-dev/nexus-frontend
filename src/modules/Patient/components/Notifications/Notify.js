import { Close } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const Notify = () => {
  return (
    <Box>
      <Box sx={{ mt: 10, width: "100%", display: "flex" }}>
        <Box
          sx={{
            width: "30px",
            height: "30px",
            backgroundColor: "#DEE6EA",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: 5,
          }}
        >
          <Close sx={{ color: "white" }} />
        </Box>
        <Box>
          <Box
            sx={{
              backgroundColor: "#6C00FF",
              width: "79px",
              height: "23px",
              borderRadius: "3px",
              p: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              margin: "0 0 10px",
            }}
          >
            <Typography color="white" variant="h6">
              Message
            </Typography>
          </Box>
          <Typography color="black" variant="h6" sx={{ margin: "5px 0" }}>
            Dr. Olufemi Nifemi sent a new message
          </Typography>
          <Typography
            color="text.secondary"
            variant="caption"
            sx={{ margin: "5px 0" }}
          >
            Don’t worry about the headaches, its part of the symptoms during the
            first stages
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ margin: "10px 0" }} />
      <Box />
    </Box>
  );
};

export default Notify;
