import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import loginImg from "../../../assets/images/login.png";
import { useSignupContext } from "../../../context/SignupContext";
import { useNavigate } from "react-router-dom";
import { EastOutlined, West } from "@mui/icons-material";
import { useAlert } from "../../../context/NotificationProvider";
import { useMutation } from "react-query";
import { doctorSignup } from "../services/authServices";
import { Link, } from "react-router-dom";
import DoctorSignupStep1 from "./DoctorSignupStep1";
import DoctorSignupStep2 from "./DoctorSignupStep2";
import { LoadingButton } from "@mui/lab";

const DoctorSignup = () => {
  const navigate = useNavigate();
  const { showNotification } = useAlert();
  const { mutate, isLoading } = useMutation(doctorSignup, {
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

      navigate("/verify", { replace: true });
    },
  });


  const onSubmit = (payload) => {
    const formData = new FormData();
    formData.append("profilePicture", payload.profilePicture);
    formData.append("lastName", payload.lastName);
    formData.append("firstName", payload.firstName);
    formData.append("email", payload.email);
    formData.append("specialty", payload.specialty);
    formData.append("password", payload.password);
    formData.append("phoneNumber", payload.phoneNumber);
    formData.append("address", payload.address);
    formData.append("gender", payload.gender);
    formData.append("confirmPassword", payload.confirmPassword);
    mutate(formData);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  const { doctorHandleSubmit, doctorWatch, doctorTrigger } = useSignupContext();

  const { profilePicture, lastName, firstName, email, dateOfBirth, relationshipStatus, emergencyContactName, emergencyContactNumber, emergencyContactAddress, password, phoneNumber, address, gender, allergies, confirmPassword, existingMedicalConditions, } = doctorWatch()

  const [activeStep, setActiveStep] = useState(0);
  
  const handleErrorField = async () => {
    await doctorTrigger()
    await doctorTrigger()
    // console.log(errors);
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setActiveStep(0);
    } else if (
      profilePicture === "" ||
      gender === "" ||
      relationshipStatus === "" ||
      dateOfBirth === "" ||
      allergies === "" ||
      existingMedicalConditions === ""
    ) {
      setActiveStep(1);
    } else if (
      emergencyContactAddress === "" ||
      emergencyContactName === "" ||
      emergencyContactNumber === "" ||
      phoneNumber === "" ||
      address === ""
      ) {
        setActiveStep(2);
      } else {
        return false
      }
      return false
    };
    

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSlide = (index) => {
    setActiveStep(index);
  };

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Grid container>
        <Box
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
            flexWrap: "wrap",
            alignItems: "center",
            height: { xs: "100vh", md: "100vh" },
            paddingBottom: { xs: "20px", md: "0" },
          }}
        >
          <Typography
            sx={{
              position: {  xs: `static`, md: "absolute" },
              textAlign: "right",
              paddingTop: {xs: "30px", md: "0"},
              paddingRight: {xs: "10%", md: "0"},
              width: "100%",
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
              width: { xs: "80%", md: "70%" },
            }}
          >
            {activeStep < 1 ? (
              ""
            ) : (
              <Typography
                variant="h6"
                color="inherit"
                component="div"
                sx={{
                  textAlign: "left",
                  marginBottom: "30px",
                  fontWeight: 700,
                  fontSize: "28px !important",
                  display: "flex",
                  alignItems: "center",
                  color: "#252B33",
                }}
              >
                <West
                  onClick={handleBack}
                  fontSize="large"
                  sx={{ marginRight: "12px", cursor: "pointer" }}
                />{" "}
                Tell us more
              </Typography>
            )}

            {activeStep === 0 ? <DoctorSignupStep1 /> : ""}
            {activeStep === 1 ? <DoctorSignupStep2 /> : ""}
            {/* {activeStep === 2 ? <DoctorSignupStep3 /> : ""} */}

            <LoadingButton
              fullWidth
              size="small"
              loading={isLoading}
              onClick={() => {
                if (activeStep >= 1) {
                  handleErrorField()
                  doctorHandleSubmit(onSubmit)();
                } else {
                  handleNext();
                }
              }}
              variant="contained"
              endIcon={<EastOutlined sx={{ marginLeft: "12px" }} />}
              sx={{
                margin: "30px 0",
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
              {activeStep < 1 ? `Continue` : "Finish"}
            </LoadingButton>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              {[1, 2].map((testimonial, index) => (
                <Box
                  key={testimonial}
                  sx={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    backgroundColor: "gray",
                    margin: "12px 4px",
                    cursor: "pointer",
                    ...(index === activeStep && {
                      backgroundColor: "#252B33",
                    }),
                  }}
                  onClick={() => handleSlide(index)}
                />
              ))}
            </Box>
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
                  Already have an account?{" "}
                  <Link
                    style={{ decoration: "none", color: "#CE1E23" }}
                    to={"/signin-doctor"}
                  >
                    Sign in
                  </Link>
                </Typography>
              </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default DoctorSignup;
