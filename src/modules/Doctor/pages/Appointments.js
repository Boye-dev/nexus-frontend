import { Box, Typography } from "@mui/material";
import Calendar from "../components/Appointments/Calendar";

const Appointments = () => {

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box sx={{ width: "100%", backgroundColor: "#F5F5F5", pb: 4 }}>
        <Box
          sx={{
            pt: 10,
            pl: 10,
            pr: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3" sx={{ color: "black" }}>
            Appointments
          </Typography>
        </Box>
      </Box>
      <Calendar />
    </Box>
  );
};

export default Appointments;
