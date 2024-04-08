import { Box, Drawer } from "@mui/material";
import React from "react";

const EventDrawer = (props) => {
  return (
    <>
      <Drawer open={props.open} anchor="right" onClose={props.onClose}>
        <Box>
          <p>{props.event?.title || "--"}</p>
        </Box>
      </Drawer>
    </>
  );
};

export default EventDrawer;
