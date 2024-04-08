import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import Calendar from "../components/Appointments/Calendar";
import Book from "../components/Appointments/Book";
import { Add } from "@mui/icons-material";

const Appointments = () => {
  const [book, setBook] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        width: "100%",
        minHeight: "100vh",
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
          <Button
            disableElevation
            variant="contained"
            startIcon={<Add />}
            sx={{ borderRadius: "14px" }}
            onClick={() => setBook(true)}
          >
            New Appointment
          </Button>
        </Box>
      </Box>
      <Calendar />
      <Book
        open={book}
        onClose={() => {
          setBook(false);
        }}
      />
    </Box>
  );
};

export default Appointments;
