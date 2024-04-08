import React from "react";
import { CircularProgress } from "@mui/material";
import { useMutation } from "react-query";
import { forgotPasswordPatient } from "../services/authServices";
// import logo from "../../../assets/svgs/logosmall.svg";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loginImg from "../../../assets/images/login.png";
import { useAlert } from "../../../context/NotificationProvider";
import { LoadingButton } from "@mui/lab";
import ForgotPasswordPatientStep1 from "../components.js/ForgotPasswordPatientStep1";
import ForgotPasswordPatientStep2 from "../components.js/ForgotPasswordPatientStep2";
import { useSignupContext } from "../../../context/SignupContext";

const ForgotPasswordPatient = () => {
  const { showNotification } = useAlert();

  const { forgotPasswordHandleSubmit } = useSignupContext();

  const [activeStep, setActiveStep] = useState(0);

  const { mutate, isLoading } = useMutation(forgotPasswordPatient, {
    onError: (error) => {
      if (error.response && (error.response.status === 500 || error.response.status === 400)) {
        // Handle the 500 error here
        showNotification?.(error.response.data.message || "Internal Server Error" , {
          type: "error",
        });
      } else {
        // Handle other errors
        console.log(error);
        showNotification?.(
          error.response.data.errors[0] || error.response.data.message ||
            error.message ||
            error.error ||
            "An error occurred",
          {
            type: "error",
          }
        );
      }
    },
    onSuccess: (data) => {
      setActiveStep(1);
      // navigate("/verify", { replace: true });
    },
  });
  const onSubmitEmail = (payload) => {
    mutate(payload);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {false ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: "auto", md: "100vh" },
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
                  width: { xs: "80%", md: "80%" },
                }}
              >
                {activeStep === 0 ? <ForgotPasswordPatientStep1 /> : ""}
                {activeStep === 1 ? <ForgotPasswordPatientStep2 /> : ""}
                <LoadingButton
                  fullWidth
                  size="small"
                  loading={isLoading}
                  onClick={forgotPasswordHandleSubmit(onSubmitEmail)}
                  variant="contained"
                  // endIcon={<EastOutlined sx={{ marginLeft: "12px" }} />}
                  sx={{
                    margin: "30px 0",
                    fontSize: "18px !important",
                    background: "#252B33",
                    padding: "6px",
                    marginBottom: "6px",
                    display: activeStep === 0 ? "block" : "none",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#252B33",
                    },
                  }}
                >
                  Continue
                </LoadingButton>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: activeStep === 0 ? "start" : "center",
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "left",
                      marginTop: "10px",
                      color: "black",
                    }}
                  >
                    Return to{" "}
                    <Link
                      style={{ decoration: "none", color: "#CE1E23" }}
                      to={"/signin"}
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ForgotPasswordPatient;
