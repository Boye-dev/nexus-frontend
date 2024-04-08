import React from "react";
import logo from "../../../assets/svgs/logosmall.svg";
import { Link,  } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, } from "react";
import loginImg from "../../../assets/images/login.png";

const VerifyPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Grid container>
        <Box
          item
          md={5}
          xs={12}
          sx={{
            position: "fixed",
            left: 0,
            width: "40vw",
            boxShadow: "0 0 5px 0 gray",
            textAlign: "center",
            height: "100vh",
            background: `url(${loginImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: { xs: "none", md: "block" },
          }}
        />
        <Box
          item
          md={7}
          xs={12}
          sx={{
            width: { xs: "100%", md: "60%" },
            marginLeft: { xs: "0", md: "40%" },
            textAlign: "center",
            background: { xs: `none`, md: "none" },
            backgroundRepeat: { xs: "no-repeat", md: "none" },
            backgroundSize: { xs: "cover", md: "none" },
            display: "flex",
            alignItems: "center",
            height: { xs: "100vh", md: "100vh" },
            // paddingBottom: {xs: "100px", md: "0"},
          }}
        >
          <Typography
            sx={{
              position: {  xs: `absolute`, md: "absolute" },
              top: "30px",
              right: "30px",
              zIndex: "9999"
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "#CE1E23" }}
              to={"/home"}
            >
              Back to home {">"}
            </Link>
          </Typography>
          <Box
            sx={{
              margin: "auto",
              width: { xs: "80%", md: "60%" },
            }}
          >

                <img src={logo} alt="" />

                <Typography
                variant="h6"
                color="inherit"
                component="div"
                sx={{
                    marginBottom: "12px",
                    fontWeight: 700,
                    // marginTop: "10vh",
                    fontSize: "28px !important",
                }}
                >
                Sign in to <span style={{ color: "#CE1E23" }}> NEXUS</span>
                </Typography>
                <Typography
                variant="h6"
                color="inherit"
                component="div"
                sx={{
                    marginBottom: "12px",
                    fontWeight: 500,
                    // marginTop: "10vh",
                    fontSize: "18px !important",
                }}
                >
                    A verification email has been sent to you.<br/> Follow the link to complete registration.
                </Typography>



                

          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default VerifyPage;
