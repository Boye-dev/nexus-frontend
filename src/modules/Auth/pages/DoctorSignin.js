import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
// import { PatientPaths, BasePaths } from "../../../routes/paths";
// import { Roles } from "../../../constants/roles";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { doctorLogin } from "../services/authServices";
import logo from "../../../assets/svgs/logosmall.svg";
import { Grid, Typography, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../../assets/images/login.png";
import { useAlert } from "../../../context/NotificationProvider";
import { setToken } from "../../../utils/auth";
import { LoadingButton } from "@mui/lab";

const DoctorSignin = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname;

  const { showNotification } = useAlert();
  const { mutate, isLoading } = useMutation(doctorLogin, {
    onError: (error) => {
      if (error.response && (error.response.status === 500 || error.response.status === 400)) {
        // Handle the 500 error here
        showNotification?.(error.response.data.message || error?.response?.data?.errors[0] || "Internal Server Error" , {
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
      if (data.data.verified) {
        setToken(data?.token);

        // const decodedUser = getDecodedJwt();

        navigate("/doctor", { replace: true });
      } else {
        showNotification?.("Please Verify Your Email", {
          type: "error",
        });
      }
    },
  });
  const onSubmit = (payload) => {
    mutate(payload);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema = yup.object().shape({
    email: yup.string().required("Email Is Required"),
    password: yup.string().required("Password Is Required"),
  });

  const { handleSubmit, trigger, control } = useForm({
    resolver: yupResolver(schema),
  });
  const [values, setValues] = useState({
    vertical: "bottom",
    horizontal: "center",
    open: false,
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

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
            position: "relative",
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
              Sign in as a doctor to{" "}
              <span style={{ color: "#CE1E23" }}> NEXUS</span>
            </Typography>
            {/* <Box width="100%" display="flex">
              <Button
                onClick={handleSubmit(handleLoadClick)}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                sx={{
                  fontSize: "16px !important",
                  fontWeight: 300,
                  background: "#CE1E23",
                  padding: "6px 24px",
                  width: "fit-content",
                  textAlign: "left",
                  marginBottom: "20px",
                  color: "#fff",
                  "&:hover": {
                      backgroundColor: '#CE1E23'
                  },
                }}
              >
                <GoogleIcon fontSize="small" sx={{marginRight: "6px"}} />  Sign in with Google
              </Button>
            </Box> */}

            {/* <Box
              sx={{
                display: "flex",
                marginBottom: "20px",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center"
                
              }}
            >
              <Box
                sx={{
                  height: "1px",
                  background: "#c5c5c5",
                  width: "40%"
                }}
              />
                <Typography
                  sx={{
                    textAlign: "left",
                    color: "#c5c5c5",
                    fontWeight: 300,
                    width: "fit-content",
                    fontSize: "14px !important",
                    height: "100%"
                  }}
                >
                  Or with Email
                </Typography>
                <Box
                  sx={{
                    height: "1px",
                    background: "#c5c5c5",
                    width: "40%"
                  }}
                />
              </Box> */}

            <form action="">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    size="small"
                    InputProps={{
                      style: {
                        fontSize: "16px",
                        color: "#000 !important",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: "black",
                      },
                    }}
                    sx={{
                      marginBottom: "30px",
                      color: "black !important",
                      background: "#F5F5F6",
                      borderRadius: "5px",
                      "& .MuiInputBase-input": {
                        outline: "none",
                        borderRadius: "3px",
                        color: "#000",
                      },
                      "& .MuiInputBase-input:hover": {
                        border: "0",
                        outline: "none",
                        borderRadius: "5px",
                        color: "#000",
                      },
                      "& .MuiFormHelperText-root": {
                        color: "red !important",
                        background: "#fff",
                        width: "100%",
                        margin: 0,
                      },
                      "& .Mui-active": {
                        // border: errors.email
                        //   ? "1px solid red"
                        //   : "1px solid white",
                        outline: "none",
                        borderRadius: "5px",
                      },
                      "& .Mui-focused": {
                        color: "#000",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#000", // Change the border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#000", // Change the border color when active/focused
                        },
                      },
                    }}
                    label="Email"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("email");
                    }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    sx={{
                      marginBottom: "30px",
                      color: "black",
                      background: "#F5F5F6",
                      borderRadius: "5px",
                      "& .MuiInputBase-input": {
                        outline: "none",
                        borderRadius: "3px",
                        color: "#000",
                      },
                      "& .MuiInputBase-input:hover": {
                        border: "0",
                        outline: "none",
                        borderRadius: "5px",
                        color: "#000",
                      },
                      "& .MuiFormHelperText-root": {
                        color: "red !important",
                        background: "#fff",
                        width: "100%",
                        margin: 0,
                      },
                      "& .Mui-active": {
                        // border: errors.email
                        //   ? "1px solid red"
                        //   : "1px solid white",
                        outline: "none",
                        borderRadius: "5px",
                      },
                      "& .Mui-focused": {
                        color: "#000",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#000", // Change the border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#000", // Change the border color when active/focused
                        },
                      },
                    }}
                    label="Password"
                    fullWidth
                    size="small"
                    {...fields}
                    type={values.showPassword ? "text" : "password"}
                    InputLabelProps={{
                      style: {
                        color: "black",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleClickShowPassword}>
                          {values.showPassword === true ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      ),
                      style: {
                        fontSize: "16px",
                      },
                    }}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("password");
                    }}
                  />
                )}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  mb: 5,
                }}
              >
                <Typography variant="caption">
                  <Link
                    style={{ textDecoration: "none", color: "#CE1E23" }}
                    to={"/forgot-password-doctor"}
                  >
                    Forgot Password?
                  </Link>
                </Typography>
              </Box>
              <LoadingButton
                fullWidth
                size="small"
                loading={isLoading}
                onClick={handleSubmit(onSubmit)}
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
                Login
              </LoadingButton>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "left",
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  Don't have an account?{" "}
                  <Link
                    style={{ decoration: "none", color: "#CE1E23" }}
                    to={"/doctor-signup"}
                  >
                    Get Started
                  </Link>
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default DoctorSignin;
