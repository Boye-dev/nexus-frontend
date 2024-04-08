import { Close } from "@mui/icons-material";
import { Box, Drawer, Typography } from "@mui/material";
import React from "react";
import { getRandomColor } from "../../../Doctor/pages/Waitlist";

const PendingDrawer = (props) => {
  // const color = ["#0FC916", "#FCBA03", "#6E00FF", "#F30505", "#6E00FF"];

  return (
    <Drawer
      open={props.open}
      anchor="right"
      onClose={props.onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", md: "400px" },
        },
      }}
    >
      <Box sx={{ p: 10 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Typography color="black" variant="h5">
            Pending Appointments
          </Typography>
          <Close
            sx={{ color: "black", cursor: "pointer" }}
            onClick={props.onClose}
          />
        </Box>

        {props?.data?.data?.appointments.length > 0 ? (
          props?.data?.data?.appointments.map((item, index) => {
            return (
              <>
                <Box
                  key={item?._id}
                  sx={{
                    width: "100%",
                    minHeight: "30px",
                    backgroundColor: "#F4F4F4",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                    display: "flex",

                    mt: 3,
                    mb: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Box display="flex" sx={{ width: "75%" }}>
                    <Box
                      sx={{
                        width: "1.99px",
                        height: "100%",
                        borderRadius: "5px",
                        backgroundColor: getRandomColor(),
                      }}
                    />
                    <Box
                      ml={5}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      p={1}
                    >
                      <Typography color="black" variant="h6">
                        {item?.title || "--"}
                      </Typography>
                      <Typography color="text.secondary" variant="caption">
                        Doctor : Dr {item?.doctorId?.lastName || "--"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </>
            );
          })
        ) : (
          <Typography variant="h6" mt={4} color="text.secondary">
            No Pending Appointments
          </Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default PendingDrawer;
