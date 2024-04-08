import { Box, Typography } from "@mui/material";
import React from "react";
import Notify from "../components/Notifications/Notify";

const Notification = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",

          backgroundColor: "#F5F5F5",
          height: "auto",
          pb: 10,
        }}
      >
        <Box
          sx={{
            pt: 10,
            pl: 8,
            paddingBottom: "30px",
            borderBottom: "1px solid #E2E5FB",
            marginBottom: "20px",
          }}
        >
          <Typography
            variant="h3"
            sx={{ color: "black", fontSize: { xs: "24px !important" } }}
          >
            Notifications
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "black", fontWeight: 400, letterSpacing: 1 }}
          >
            You have{" "}
            <span style={{ fontWeight: 600, color: "#ED2228" }}>{10}</span>{" "}
            unread notifications.
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              pl: 8,
              pr: 8,
            }}
          >
            {" "}
            {[1, 2, 4, 5, 6].map((item) => {
              return <Notify />;
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Notification;
