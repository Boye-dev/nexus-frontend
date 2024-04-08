import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect } from "react";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "../components/Home/Footer";
import Navbar from "../components/Home/Navbar";
import { faq } from "../constants/faq";

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={
        {
          // height: "100vh",
        }
      }
    >
      <Navbar />

      <Box
        sx={{
          margin: "100px auto 100px",
          width: { xs: "90%", md: "70%" },
          paddingTop: "50px",
        }}
      >
        <Typography
          variant="h3"
          color="black"
          fontWeight={600}
          textAlign="center"
        >
          Frequently Asked Questions
        </Typography>
        <Box
          sx={{
            width: "180px",
            height: "3px",
            backgroundColor: "#EB2B31",
            borderRadius: "6px",
            margin: "auto",
            mt: 2,
            mb: 10,
          }}
        />
        {faq.map((item) => {
          return (
            <Box key={item.id}>
              <Accordion
                expanded={expanded === item.id}
                onChange={handleChange(item.id)}
                sx={{
                  padding: "10px 20px",
                  boxShadow: "0",
                  borderBottom: "1px solid gray",
                  borderRadius: "0",
                  "MuiPaper-root-MuiAccordion-root": { borderRadius: 0 },
                }}
                />
                {
                    faq.map(item => {
                        return (
                            <Box key={item.id}>
                                <Accordion expanded={expanded === item.id} onChange={handleChange(item.id)} sx={{padding: "10px 20px", boxShadow: "0", borderBottom: "1px solid gray", borderRadius: "0", "MuiPaper-root-MuiAccordion-root": {borderRadius: 0}}}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon fontSize="large" sx={{background: expanded === item.id ? "#EB2B31" : "#000", color: "white", borderRadius: "50%", }}/>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography variant="h5" sx={{color: "black",  }}>
                                            {item.question}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography  sx={{color: "black", }}>
                                            {item.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        )
                    })
                }
            </Box>
          );
        })}
      </Box>
      <Footer />
    </Box>
  );
};

export default FAQ;
