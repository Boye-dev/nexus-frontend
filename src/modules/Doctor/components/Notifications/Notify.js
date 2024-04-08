import { Close } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { formatDateTime } from "../../../../utils/formatDate";

const Notify = ({ notification }) => {
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
              backgroundColor:
                notification.type === "Appointment" ? "#13D71B" : "#6C00FF",
              width: "100px",
              height: "23px",
              borderRadius: "3px",
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              margin: "0 0 10px",
            }}
          >
            <Typography color="white" variant="h6">
              {notification.type}
            </Typography>
          </Box>
          <Typography color="black" variant="h6" sx={{ margin: "5px 0" }}>
            {notification.title}
          </Typography>
          <Typography
            color="text.secondary"
            variant="caption"
            sx={{ margin: "5px 0" }}
          >
            {notification.content}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Typography color="text.secondary" variant="caption">
            {formatDateTime(notification.createdAt)}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ margin: "10px 0" }} />
      <Box />
    </Box>
  );
};

export default Notify;
