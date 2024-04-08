import { Box, Typography } from "@mui/material";
import React from "react";
import { getDecodedJwt } from "../../../../utils/auth";
import { getFormattedTime } from "../../../../utils/formatDate";

const MainMessage = ({ message }) => {
  const decodedUser = getDecodedJwt();

  return (
    <>
      <Box
        sx={{
          p: 2,

          display: "flex",
          justifyContent:
            decodedUser.id === message.sender.userDetails._id
              ? "flex-end"
              : "flex-start",
        }}
      >
        {decodedUser.id === message.sender.userDetails._id && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                textAlign: "right",

                fontSize: "10px !important",
                color: "#555555",
              }}
            >
              {getFormattedTime(message.createdAt)}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            maxWidth: "60%",
            height: "auto",
            backgroundColor:
              decodedUser.id === message.sender.userDetails._id
                ? "#ED2228"
                : "#E6E6E6",
            borderRadius: "7px",
            p: 2,
            mr: decodedUser.id === message.sender.userDetails._id || 2,
            ml: decodedUser.id === message.sender.userDetails._id && 2,
          }}
        >
          <Typography
            sx={{
              color:
                decodedUser.id === message.sender.userDetails._id
                  ? "white"
                  : "black",
            }}
          >
            {message.content}{" "}
          </Typography>
        </Box>
        {decodedUser.id === message.sender.userDetails._id || (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                textAlign: "right",

                fontSize: "10px !important",
                color: "#555555",
              }}
            >
              {getFormattedTime(message.createdAt)}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default MainMessage;
