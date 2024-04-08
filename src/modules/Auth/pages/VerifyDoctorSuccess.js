import React from "react";
import { CircularProgress } from "@mui/material";
import { verifyDoctor } from "../services/authServices";
import logo from "../../../assets/svgs/logosmall.svg";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import loginImg from "../../../assets/images/login.png";
import { useAlert } from "../../../context/NotificationProvider";
import { LoadingButton } from "@mui/lab";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";

const VerifyPatientSuccess = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const { showNotification } = useAlert();

  const { doctorId, uniqueString } = useParams();

  const { isLoading, data } = useQuery(
    [
      "verifyDoctor",
      {
        doctorId,
        uniqueString,
      },
    ],
    verifyDoctor,
    {
      enabled: true,
      
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
      setMessage(error.response?.data?.message);
    },
      onSuccess: (data) => {
        setMessage(data.message);
      },
    }
  );
  const onSubmit = () => {
    navigate("/signin-doctor");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading ? (
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
              }}
            >
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
                    fontSize: "28px !important",
                  }}
                >
                  Sign in to <span style={{ color: "#CE1E23" }}> NEXUS</span> as
                  Doctor
                </Typography>
                <Typography
                  variant="h6"
                  color="inherit"
                  component="div"
                  sx={{
                    marginBottom: "12px",
                    fontWeight: 500,
                    fontSize: "18px !important",
                  }}
                >
                  {message || data?.message}
                </Typography>

                <LoadingButton
                  fullWidth
                  size="small"
                  loading={isLoading}
                  onClick={onSubmit}
                  endIcon={<SendIcon />}
                  loadingPosition="end"
                  variant="contained"
                  sx={{
                    fontSize: "18px !important",
                    background: "#252B33",
                    padding: "6px",
                    marginBottom: "6px",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#252B33",
                    },
                  }}
                >
                  Proceed To Login
                </LoadingButton>
              </Box>
            </Box>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default VerifyPatientSuccess;
