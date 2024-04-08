import React from "react";
import Navbar from "../components/Home/Navbar";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import HomeImage1 from "../assets/images/homeimage1.png";
import HomeImage2 from "../assets/images/homeImage2.png";
import {
  AccessTime,
  Email,
  House,
  KeyboardArrowRight,
  Phone,
} from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";
import { ReactComponent as Review } from "../assets/svgs/reviews.svg";
import Dentistry from "../assets/svgs/Departments/Clean.png";
import Neurology from "../assets/svgs/Departments/Brain.png";
import Cardiology from "../assets/svgs/Departments/Heart.png";
import Orthopedic from "../assets/svgs/Departments/Bone.png";
import Ophthalmology from "../assets/svgs/Departments/Eye.png";
import doctor from "../assets/images/doctor1.png";
import Badge from "../assets/images/Badge.png";
import Chat from "../assets/images/Chat.png";
import Padlock from "../assets/images/Padlock.png";
import doctor6 from "../assets/images/doctor6.png";
import doctor7 from "../assets/images/doctor7.png";
import doctor8 from "../assets/images/doctor8.png";
import doctor9 from "../assets/images/doctor9.png";
import doctor10 from "../assets/images/doctor10.png";
import Person from "../assets/images/Person.png";
import Subscribe from "../assets/images/Email.png";
import { Controller, useForm } from "react-hook-form";
import Footer from "../components/Home/Footer";
import TestimonialCarousel from "../components/Home/TestimonialCarousel";
import Carousel from "../components/Home/Carousel";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "../context/NotificationProvider";
import { useMutation } from "react-query";
import { LoadingButton } from "@mui/lab";
import { subscribe } from "../services/homeServices";

const Home = () => {
  const schema = yup.object().shape({
    email: yup.string().required("Email Is Required"),
    fullname: yup.string().required("Full name Is Required"),
  });
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const {
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { showNotification } = useAlert();
  const { mutate, isLoading } = useMutation(subscribe, {
    onError: (error) => {
      if (
        error.response &&
        (error.response.status === 500 || error.response.status === 400)
      ) {
        // Handle the 500 error here
        showNotification?.(
          error.response.data.message ||
            error?.response?.data?.errors[0] ||
            "Internal Server Error",
          {
            type: "error",
          }
        );
      } else {
        // Handle other errors
        console.log(error);
        showNotification?.(
          error.response.data.errors[0] ||
            error.response.data.message ||
            error.response.data.error ||
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
      showNotification?.(data.message, {
        type: "success",
      });
    },
  });

  const onSubmit = (payload) => {
    mutate(payload);
  };

  const navigate = useNavigate();

  return (
    <Box>
      <Navbar />
      <Box id="home" sx={{ marginTop: "100px" }} data-aos="fade-right">
        <Grid
          container
          sx={{
            width: "100%",
            height: "90vh",
          }}
        >
          <Grid item md={7} xs={12} data-aos="fade-right">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                padding: "0 10% 0 30%",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    width: "220px",
                    height: "220px",
                    borderRadius: "100%",
                    position: "absolute",
                    top: "-30%",
                    left: "-33%",
                    zIndex: "-100",
                  }}
                ></Box>
                <Typography
                  sx={{
                    color: "#061829",
                    fontSize: {
                      xs: "30px !important",

                      md: "43px !important",
                    },
                    fontWeight: "700",
                  }}
                >
                  Your Most
                </Typography>
                <Typography
                  sx={{
                    color: "#061829",
                    fontSize: {
                      xs: "30px !important",

                      md: "43px !important",
                    },
                    fontWeight: "700",
                  }}
                >
                  Trusted Health
                </Typography>
                <Typography
                  sx={{
                    color: "#061829",
                    fontSize: {
                      xs: "30px !important",

                      md: "43px !important",
                    },
                    fontWeight: "700",
                  }}
                >
                  Partner Of Life
                </Typography>
                <Typography color="text.secondary" mb={5}>
                  Start your journey to better health today, with Nexus! A
                  platform to connect doctors and patients for personalized
                  healthcare solutions. Your well-being is our priority.
                </Typography>
                <Box>
                  <Box
                    onClick={() => {
                      navigate("/patient");
                    }}
                    sx={{
                      borderRadius: "50px",
                      padding: "8px 10px",
                      backgroundColor: (theme) => theme.palette.primary.main,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      width: "200px",
                    }}
                  >
                    <Typography sx={{ color: "white" }} variant="caption">
                      Book Appointment
                    </Typography>
                    <KeyboardArrowRight sx={{ color: "white" }} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            data-aos="fade-down-left"
            item
            md={5}
            xs={12}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box sx={{ display: "flex", pt: 20 }}>
              <Box>
                <Box
                  sx={{
                    backgroundColor: "#EC2227",
                    height: "80px",
                    width: "30px",
                  }}
                ></Box>
                <Box
                  sx={{
                    backgroundColor: "#A31923",
                    height: "50px",
                    width: "30px",
                  }}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <img src={HomeImage1} alt="" width="100%" height="100%" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        data-aos="fade-up"
        id="contact"
        sx={{
          backgroundColor: "#F1F1F1",
          minHeight: "139px",
          padding: { xs: "0", md: "3px 30px" },
        }}
      >
        <Grid container sx={{ padding: "3% 5% 0" }}>
          <Grid item xs={6} md={2.25} sx={{ display: "flex", mb: 2 }}>
            <Box>
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    borderRadius: "100%",
                    padding: "5px",
                    backgroundColor: (theme) => theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    width: "22px",
                    height: "22px",
                  }}
                >
                  <AccessTime sx={{ color: "white" }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: "600",
                      color: "#666666",
                      fontSize: "14px",
                      pl: 3,
                    }}
                  >
                    Working Time
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 1, alignItems: "center" }}>
                <Typography
                  fontWeight={400}
                  sx={{ fontSize: "15px !important" }}
                  fontSize="16px"
                  color="#121212"
                >
                  Emergency Calls 24/7
                </Typography>
                <Typography
                  fontWeight={400}
                  sx={{ fontSize: "15px !important" }}
                  fontSize="16px"
                  color="#121212"
                >
                  Appointment booking 24/7
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6} md={2.25} sx={{ display: "flex", mb: 2 }}>
            <Box
              sx={{
                backgroundColor: "#DCDCDC",
                width: "2px",
                height: "100px",
                display: { xs: "none", md: "block" },
                mr: 5,
              }}
            />
            <Box>
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    borderRadius: "100%",
                    padding: "5px",
                    backgroundColor: (theme) => theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    width: "22px",
                    height: "22px",
                  }}
                >
                  <Phone sx={{ color: "white" }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: "600",
                      color: "#666666",
                      fontSize: "14px",
                      pl: 3,
                    }}
                  >
                    Call Us
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", mt: 1, alignItems: "center" }}>
                <Typography
                  fontWeight={400}
                  fontSize="16px"
                  sx={{ fontSize: "15px !important" }}
                  color="#121212"
                >
                  +234 7263284633
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} md={2.25} sx={{ display: "flex", mb: 2 }}>
            <Box
              sx={{
                backgroundColor: "#DCDCDC",
                width: "2px",
                height: "100px",
                display: { xs: "none", md: "block" },
                mr: 5,
              }}
            />

            <Box>
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    borderRadius: "100%",
                    padding: "5px",
                    backgroundColor: (theme) => theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    width: "22px",
                    height: "22px",
                  }}
                >
                  <Email sx={{ color: "white" }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: "600",
                      color: "#666666",
                      fontSize: "14px",
                      pl: 3,
                    }}
                  >
                    Email Us
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", mt: 1, alignItems: "center" }}>
                <Typography
                  fontWeight={400}
                  fontSize="16px"
                  sx={{ fontSize: "15px !important" }}
                  color="#121212"
                >
                  info@nexus.com
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} md={3} sx={{ display: "flex", mb: 8 }}>
            <Box
              sx={{
                backgroundColor: "#DCDCDC",
                width: "2px",
                height: "100px",
                display: { xs: "none", md: "block" },
                mr: 5,
              }}
            />

            <Box>
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    borderRadius: "100%",
                    padding: "5px",
                    backgroundColor: (theme) => theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    width: "22px",
                    height: "22px",
                  }}
                >
                  <House sx={{ color: "white" }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: "600",
                      color: "#666666",
                      fontSize: "14px",
                      pl: 3,
                    }}
                  >
                    Address
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", mt: 1, alignItems: "center" }}>
                <Typography
                  fontWeight={400}
                  sx={{ fontSize: "15px !important" }}
                  color="#121212"
                >
                  1 Aguiyi Ironsi Street Abuja, 900001, Nigeria
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={2.25}
            sx={{ mb: 2, justifyContent: "center", display: "flex" }}
          >
            <Box
              sx={{
                backgroundColor: "#DCDCDC",
                width: "2px",
                height: "100px",
                display: { xs: "none", md: "block" },
                mr: 5,
              }}
            />

            <Box>
              <Box sx={{ display: "flex" }}>
                <Review />
                <Box ml={2} display="flex">
                  {[1, 2, 3, 4].map((v, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          backgroundColor: "#00AA6C",
                          width: "18px",
                          height: "18px",
                          borderRadius: "100%",
                          ml: 1,
                          border: "2px solid #00AA6C",
                        }}
                      />
                    );
                  })}
                  <Box
                    sx={{
                      backgroundColor: "white",

                      width: "18px",
                      height: "18px",
                      borderRadius: "100%",
                      border: "2px solid #00AA6C",
                      ml: 1,
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", mt: 3, alignItems: "center" }}>
                <Typography
                  fontWeight={600}
                  fontSize="18px"
                  color="text.secondary"
                  sx={{ fontSize: "15px !important" }}
                >
                  4
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#DCDCDC",
                    width: "2px",
                    height: "19px",
                    ml: 5,
                    mr: 5,
                  }}
                />
                <Typography
                  fontWeight={600}
                  fontSize="18px"
                  color="text.secondary"
                  sx={{
                    textDecoration: "underline",
                    fontSize: "15px !important",
                  }}
                >
                  5 Reviews
                </Typography>
              </Box>
              <Box sx={{ display: "flex", mt: 1, alignItems: "center" }}>
                <Typography
                  fontWeight={600}
                  fontSize="14px"
                  color="text.secondary"
                  sx={{ fontSize: "15px !important" }}
                >
                  Based on <span style={{ fontWeight: "700" }}>2489 </span>
                  patient reviews
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ margin: "5%" }}>
        <Box display="flex" justifyContent="center" width="100%">
          <Box display="flex" alignItems="center" flexDirection="column">
            <Typography
              variant="h2"
              color="black"
              fontWeight={600}
              textAlign="center"
            >
              Clinic and Specialties
            </Typography>
            <Box
              sx={{
                width: "180px",
                height: "3px",
                backgroundColor: "#EB2B31",
                borderRadius: "6px",
                mt: 2,
                mb: 2,
              }}
            />
            <Typography
              data-aos="fade-right"
              variant="body2"
              width="80%"
              textAlign="center"
              color="black"
            >
              Welcome to our state-of-the-art clinic, where we provide
              specialized healthcare services tailored to meet your unique needs
              and offer a wide range of medical specialties to ensure
              comprehensive care for every patient.
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          mt={10}
        >
          {[Dentistry, Neurology, Cardiology, Orthopedic, Ophthalmology].map(
            (item) => {
              return (
                <Box data-aos="flip-right" textAlign="center">
                  <Box
                    sx={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      border: "1px solid red",
                      mb: 10,
                      p: 6,
                      ml: 3,
                      mr: 3,
                      mt: 5,
                      boxShadow: " 2px 2px 10px 5px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <img src={item} alt="" width="100%" height="100%" />
                  </Box>
                  <Typography color="black" variant="subtitle2">
                    {item === Dentistry && "Dentistry"}
                    {item === Neurology && "Neurology"}
                    {item === Cardiology && "Cardiology"}
                    {item === Orthopedic && "Orthopedic"}
                    {item === Ophthalmology && "Ophthalmology"}
                  </Typography>
                </Box>
              );
            }
          )}
        </Box>
      </Box>

      <Box
        id="about"
        sx={{ backgroundColor: "#F3F3F3", pt: 5 }}
        data-aos="fade-up"
      >
        <Box display="flex" width="100%">
          <Box sx={{ width: "15%", display: { xs: "none", md: "block" } }}>
            <img src={doctor} alt="" width="100%" height="100%" />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            sx={{ width: { xs: "100%", md: "100%" } }}
          >
            <Typography
              variant="h2"
              color="black"
              fontWeight={600}
              textAlign="center"
            >
              Meet Some of Our Doctors
            </Typography>
            <Box
              sx={{
                width: "180px",
                height: "3px",
                backgroundColor: "#EB2B31",
                borderRadius: "6px",

                mt: 2,
                mb: 2,
              }}
            />
            <Box
              sx={{
                width: { xs: "100%" },
                mt: 5,
                display: "flex",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Box>
                <Carousel
                  items={[doctor6, doctor7, doctor8, doctor9, doctor10]}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ marginTop: "100px" }}>
        <Grid
          container
          sx={{
            width: "100%",
            height: "",
            padding: "0 10%",
          }}
        >
          <Grid
            data-aos="slide-right"
            item
            md={6.5}
            xs={12}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box sx={{ display: "flex" }}>
              <Box>
                <Box
                  sx={{
                    backgroundColor: "#EC2227",
                    height: "80px",
                    width: "30px",
                  }}
                ></Box>
                <Box
                  sx={{
                    backgroundColor: "#A31923",
                    height: "50px",
                    width: "30px",
                  }}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <img src={HomeImage2} alt="" width="100%" height="100%" />
              </Box>
            </Box>
          </Grid>

          <Grid data-aos="fade-left" item md={5.5} xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                ml: { xs: 0, md: 10 },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Typography
                  sx={{
                    color: "#061829",
                    fontSize: {
                      xs: "40px !important",
                    },
                    lineHeight: "1 !important",
                    fontWeight: "700",
                  }}
                >
                  Start an online
                </Typography>
                <Typography
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontSize: {
                      xs: "40px !important",
                    },
                    lineHeight: "1 !important",
                    fontWeight: "700",
                  }}
                >
                  chat consultation
                </Typography>
                <Typography
                  sx={{
                    color: "#061829",
                    fontSize: {
                      xs: "40px !important",
                    },
                    lineHeight: "1 !important",
                    fontWeight: "700",
                    mb: 3,
                  }}
                >
                  with a doctor
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={5}>
                  Our integrated chat system enables users to engage in
                  real-time conversations with doctors, discussing health
                  concerns and determining the best course of action. It
                  provides a secure and confidential experience, allowing users
                  to ask questions, seek medical advice, and receive
                  personalized recommendations.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ padding: "5%", mt: 10, backgroundColor: "#1D272C" }}>
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          data-aos="fade-up"
        >
          <Box display="flex" alignItems="center" flexDirection="column">
            <Typography
              variant="h2"
              color="common.white"
              fontWeight={600}
              textAlign="center"
            >
              Why you should trust us?
            </Typography>
            <Box
              sx={{
                width: "180px",
                height: "3px",
                backgroundColor: "#EB2B31",
                borderRadius: "6px",
                mt: 2,
                mb: 2,
              }}
            />
            <Typography
              variant="body2"
              width="80%"
              textAlign="center"
              color="common.white"
            >
              At Nexus, we understand the importance of earning your trust. Here
              are the key reasons why you can have confidence in our services:
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          mt={10}
        >
          {[Badge, Padlock, Chat, Person].map((item, index) => {
            return (
              <Box key={index} textAlign="center" data-aos="zoom-in">
                <Box
                  sx={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "100%",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    flexDirection: "column",

                    mb: 3,
                    p: 2,
                    ml: 2,
                    mr: 2,
                    mt: 5,
                  }}
                >
                  <img src={item} alt="" width="40%" height="40%" />
                  <Typography
                    variant="body2"
                    // fontSize="10px !important"
                    mt={2}
                  >
                    {item === Badge && "Accredited & Certified"}
                    {item === Padlock && "Private & Secure"}
                    {item === Chat && "Chatbox Support"}
                    {item === Person && "Expert Medical Staff"}
                  </Typography>
                  <Typography color="common.white" variant="caption">
                    {item === Badge &&
                      " Accredited by prestigious organizations like the Joint Commission, ensuring the highest standards of quality and safety in healthcare."}
                    {item === Padlock &&
                      "At Nexus , we prioritize the privacy and security of patient information, your information is treated with utmost confidentiality."}
                    {item === Chat &&
                      " Our chatbot is available round the clock, ensuring that you can access support and information, even outside regular business hours."}
                    {item === Person &&
                      "At Nexus, our team of healthcare professionals are highly skilled, experienced, and dedicated to providing exceptional care."}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ margin: "5%" }} data-aos="fade-up">
        <Box width="100%">
          <Box>
            <Typography
              variant="h2"
              color="black"
              fontWeight={600}
              textAlign="center"
            >
              Testimonals
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                background: "",
              }}
            >
              <Box
                sx={{
                  width: "100px",
                  height: "3px",
                  backgroundColor: "#EB2B31",
                  borderRadius: "6px",
                  mt: 2,
                  mb: 2,
                  borderBottom: "20px",
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "block",
              }}
            >
              <TestimonialCarousel />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ padding: "8%", backgroundColor: "#1D272C" }}>
        <Grid
          container
          data-aos="zoom-in"
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Grid
            item
            md={6}
            xs={12}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: "80%" }}>
                <img src={Subscribe} alt="" width="100%" height="100%" />
              </Box>
            </Box>
          </Grid>

          <Grid item md={6} xs={12}>
            <Box
              sx={{
                display: { xs: "block", md: "flex" },
                alignItems: { xs: "none", md: "center" },
                height: "100%",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: {
                      xs: "35px !important",
                    },
                    fontWeight: "500",
                  }}
                >
                  Subscribe to the
                </Typography>
                <Typography
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontSize: {
                      xs: "35px !important",
                    },
                    fontWeight: "700",
                  }}
                >
                  NEXUS{" "}
                  <span style={{ fontWeight: "500", color: "white" }}>
                    newsletter
                  </span>
                </Typography>

                <Controller
                  name="email"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Please enter a correct email",
                    },
                  }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextField
                      color={errors.email ? `error` : `primary`}
                      id="email"
                      placeholder="Email"
                      value={value}
                      onBlur={onBlur}
                      onKeyUp={() => {
                        trigger("email");
                      }}
                      helperText={errors.email && `${errors.email.message}`}
                      onChange={onChange}
                      sx={{
                        width: "80%",
                        mt: 5,
                        "& .MuiInputBase-input": {
                          border: "1px solid white",
                          outline: "none",
                          borderRadius: "5px",
                          color: "white",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        },
                        "& .MuiInputBase-input:hover": {
                          border: "1px solid white",
                          outline: "none",
                          borderRadius: "5px",
                          color: "white",
                        },
                        "& .MuiFormHelperText-root": {
                          color: "red !important",
                        },
                        "& .Mui-active": {
                          border: errors.email
                            ? "1px solid red"
                            : "1px solid white",
                          outline: "none",
                          borderRadius: "5px",
                        },
                        "& .Mui-focused": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "white", // Change the border color on hover
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white", // Change the border color when active/focused
                          },
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  name="fullname"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextField
                      color={errors.email ? `error` : `primary`}
                      id="fullname"
                      placeholder="Fullname"
                      value={value}
                      onBlur={onBlur}
                      onKeyUp={() => {
                        trigger("fullname");
                      }}
                      helperText={
                        errors.fullname && `${errors.fullname.message}`
                      }
                      onChange={onChange}
                      sx={{
                        width: "80%",
                        mt: 5,
                        "& .MuiInputBase-input": {
                          border: "1px solid white",
                          outline: "none",
                          borderRadius: "5px",
                          color: "white",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        },
                        "& .MuiInputBase-input:hover": {
                          border: "1px solid white",
                          outline: "none",
                          borderRadius: "5px",
                          color: "white",
                        },
                        "& .MuiFormHelperText-root": {
                          color: "red !important",
                        },
                        "& .Mui-active": {
                          border: errors.email
                            ? "1px solid red"
                            : "1px solid white",
                          outline: "none",
                          borderRadius: "5px",
                        },
                        "& .Mui-focused": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "white", // Change the border color on hover
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white", // Change the border color when active/focused
                          },
                        },
                      }}
                    />
                  )}
                />
                <LoadingButton
                  fullWidth
                  size="small"
                  loading={isLoading}
                  onClick={handleSubmit(onSubmit)}
                  // endIcon={<SendIcon />}
                  loadingPosition="end"
                  variant="contained"
                  sx={{ width: "80%", mt: 5, pt: "10px", pb: "10px" }}
                >
                  <Typography
                    sx={{ fontSize: "16px", color: "white !important" }}
                  >
                    Subscribe
                  </Typography>
                </LoadingButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
