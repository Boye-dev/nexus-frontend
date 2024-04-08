import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarMenu = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        onClick={() => {
          props.onClose();
          navigate(props?.item.url);
        }}
        sx={{
          width: "100%",
          display: "flex",
          height: "50px",
          mt: 2,
          mb: 2,
          justifyContent: "space-between",
          cursor: "pointer",
          backgroundColor: props.isActive ? "rgba(237, 34, 40, 0.1)" : "white",

          alignItems: "center",
        }}
      >
        <Box
          sx={{
            pl: props.width === 220 ? 10 : 7,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ color: props.isActive ? "#ED2228" : "#787878" }}>
            {props.item?.icon}
          </Box>
          {props.width === 220 && (
            <Typography
              pl={5}
              variant="subtitle2"
              sx={{ color: props.isActive ? "#ED2228" : "#787878" }}
            >
              {props.item.name}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: props.isActive ? "block" : "none",
            // borderRight: "5px solid red",
            width: "2px",
            height: "100%",
            backgroundColor: "#ED2228",
          }}
        />
      </Box>
    </>
  );
};

export default SidebarMenu;
