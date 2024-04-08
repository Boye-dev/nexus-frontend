import {
  Facebook,
  Info,
  Instagram,
  Inventory,
  LinkedIn,
  Person2,
  Policy,
  Twitter,
} from "@mui/icons-material";
import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import facebook from "../../assets/svgs/facebook.svg"
import twitter from "../../assets/svgs/twitter.svg"
import phone from "../../assets/svgs/phone.svg"
import mail from "../../assets/svgs/mail.svg"
import support from "../../assets/svgs/support.svg"
import linkedin from "../../assets/svgs/linkedin.svg"
import instagram from "../../assets/svgs/instagram.svg"
import footerlogo from "../../assets/svgs/footerlogo.svg"

const Footer = () => {
  return (
    <>
      <Box sx={{ padding: "5%", backgroundColor: "#181A1B" }}>
        <Grid container>
          <Grid item xs={12} md={8} mt={10}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <Box><img src={footerlogo} alt="" srcset="" /></Box>
                <Typography variant="caption" sx={{color: "#fff", mt: 3, width: "90%"}}>
                  We provide software platform to breach the gap and enable patients connect on a more deeper level with doctors because we care. It’s time to move beyond simply building features and start designing the right product with the right strategy.
                </Typography>
              </Grid>
              <Grid item xs={6} md={3.5}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 5, mt: 3 }}>
                  <Info
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(255, 235, 235, 0.1)",
                      p: 1,
                      borderRadius: "4px",
                      mr: 3,
                      fontSize: "15px",
                    }}
                  />
                  <Typography color="white" variant="subtitle2">
                    Legal
                  </Typography>
                </Box>{" "}
                <Box sx={{ mb: 4 }}>
                  <Typography
                    color="white"
                    variant="caption"
                    sx={{ ml: 9, mt: 2,}}
                  >
                    Website Terms
                  </Typography>
                </Box>
                <Typography
                  color="white"
                  variant="caption"
                  sx={{ ml: 9, mt: 2,}}
                >
                  Website Privacy
                </Typography>
                  
              </Grid>
              <Grid item xs={6} md={3.5}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 5, mt: 3 }}>
                  <Info
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(255, 235, 235, 0.1)",
                      p: 1,
                      borderRadius: "4px",
                      mr: 3,
                      fontSize: "15px",
                    }}
                  />
                  <Typography color="white" variant="subtitle2">
                    ABOUT US
                  </Typography>
                </Box>{" "}
                <Box sx={{ mb: 4 }}>
                  <Typography
                    color="white"
                    variant="caption"
                    sx={{ ml: 9, mt: 2,}}
                  >
                    Careers
                  </Typography>
                </Box>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    color="white"
                    variant="caption"
                    sx={{ ml: 9, mt: 2,}}
                  >
                    Developers
                  </Typography>
                </Box>
                <Typography
                  color="white"
                  variant="caption"
                  sx={{ ml: 9, mt: 2,}}
                >
                  <a style={{ color: "white", textDecoration: "none",}} href="/faq">FAQs</a>
                </Typography>
                  
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} mt={13}>
            <Typography variant="subtitle2" sx={{ color: "white" }}>
              Connect
            </Typography>
            <Divider
              width="80%"
              sx={{ height: "2px", backgroundColor: "white", mt: 2, mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item sx={{ display: "flex", alignItems: "center", mb: 5 }} xs={4}>
                <img src={phone} alt="" srcset="" />
                
                <Typography color="white" sx={{ ml: 2 }} variant="caption">
                  09071423222
                </Typography>
              </Grid>
              <Grid item sx={{ display: "flex", alignItems: "center", mb: 5 }} xs={4}>
                <img src={twitter} alt="" srcset="" />
                
                <Typography color="white" sx={{ ml: 2 }} variant="caption">
                  Twitter
                </Typography>
              </Grid>
              <Grid item sx={{ display: "flex", alignItems: "center", mb: 5 }} xs={4}>
                <img src={instagram} alt="" srcset="" />
                
                <Typography color="white" sx={{ ml: 2 }} variant="caption">
                  Instagram
                </Typography>
              </Grid>
              <Grid item sx={{ display: "flex", alignItems: "center", mb: 5 }} xs={4}>
                <img src={mail} alt="" srcset="" />
                
                <Typography color="white" sx={{ ml: 2 }} variant="caption">
                  Contact Us
                </Typography>
              </Grid>
              <Grid item sx={{ display: "flex", alignItems: "center", mb: 5 }} xs={4}>
                <img src={linkedin} alt="" srcset="" />
                
                <Typography color="white" sx={{ ml: 2 }} variant="caption">
                  Linked In
                </Typography>
              </Grid>
              <Grid item sx={{ display: "flex", alignItems: "center", mb: 5 }} xs={4}>
                <img src={facebook} alt="" srcset="" />
                
                <Typography color="white" sx={{ ml: 2 }} variant="caption">
                  Facebook
                </Typography>
              </Grid>
              <Grid item sx={{ display: "flex", alignItems: "center", mb: 5 }} xs={4}>
                <img src={support} alt="" srcset="" />
                
                <Typography color="white" sx={{ ml: 2 }} variant="caption">
                  Support
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;
