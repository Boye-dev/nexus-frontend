import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Drawer,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { useAlert } from "../../../../context/NotificationProvider";
import { book } from "../../services/doctorService";
import { getDecodedJwt } from "../../../../utils/auth";
import { LoadingButton } from "@mui/lab";

const Book = (props) => {
  const { showNotification } = useAlert();
  const decodedUser = getDecodedJwt();

  const patientId = decodedUser.id;
  const schema = yup.object().shape({
    specialty: yup.string().required("Specialty Is Required"),
    title: yup.string().required("Title Is Required"),
    additionalInformation: yup.string(),
  });

  const { handleSubmit, trigger, control, watch, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { specialty, title } = watch();
  const { mutate, isLoading } = useMutation(book, {
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
      reset();
      props.onClose();
      showNotification?.(data.message, { type: "success" });
    },
  });
  const onSubmit = (payload) => {
    payload.patientId = patientId;
    mutate(payload);
  };

  return (
    <>
      <Drawer
        open={props.open}
        anchor="right"
        onClose={props.onClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", md: "500px" },
          },
        }}
      >
        <Box>
          <Box
            p={8}
            sx={{
              pb: 10,
              position: "sticky",

              top: "0",
              zIndex: "200",
              backgroundColor: "#F3F5F9",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography color="black" variant="h5">
                Add New Appointment
              </Typography>
              <Close
                sx={{ color: "black", cursor: "pointer" }}
                onClick={props.onClose}
              />
            </Box>
            <Divider />
            <Typography color="black" variant="body2" mt={5}>
              *Note: Please fill out the necessary information for you to book
              an appointment.{" "}
            </Typography>
          </Box>
          <Box>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              <TimelineItem>
                <TimelineSeparator>
                  <Box
                    sx={{
                      backgroundColor: specialty ? "#ED2228" : "#F3F5F9",
                      width: "50px",
                      height: "50px",
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography color={specialty ? "white" : "black"}>
                      1
                    </Typography>
                  </Box>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Box
                    sx={{
                      width: "100%",
                      height: "130px",

                      borderRadius: "8px",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <Box p={5}>
                      <Typography
                        color="black"
                        variant="h6"
                        sx={{ fontSize: "10px !important" }}
                      >
                        Please Select the speciality you need service from
                      </Typography>
                      <Controller
                        name="specialty"
                        control={control}
                        render={({
                          field: { ref, onChange, ...fields },
                          fieldState: { error },
                        }) => (
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={["Dentistry", "Opthamology"]}
                            onChange={(event, newValue) => {
                              onChange(newValue);
                            }}
                            getOptionLabel={(option) => option}
                            {...fields}
                            ref={ref}
                            renderOption={(props, option) => {
                              return (
                                <Typography {...props} width="100%">
                                  {option && option}
                                </Typography>
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                InputProps={{
                                  style: {
                                    fontSize: "12px !important",

                                    color: "#000 !important",
                                  },
                                }}
                                InputLabelProps={{
                                  style: {
                                    fontSize: "12px !important",
                                    color: "#000 !important",
                                  },
                                }}
                                sx={{
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
                                variant="outlined"
                                inputRef={ref}
                                label="Select Specialty"
                                {...params}
                                error={Boolean(error?.message)}
                                helperText={error?.message}
                              />
                            )}
                          />
                        )}
                      />
                    </Box>
                  </Box>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <Box
                    sx={{
                      backgroundColor: title ? "#ED2228" : "#F3F5F9",

                      width: "50px",
                      height: "50px",
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography color={title ? "white" : "black"}>2</Typography>
                  </Box>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Box
                    sx={{
                      width: "100%",
                      height: "130px",

                      borderRadius: "8px",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <Box p={5}>
                      <Typography
                        color="black"
                        variant="h6"
                        sx={{ fontSize: "10px !important" }}
                      >
                        Please enter a title
                      </Typography>
                      <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        render={({
                          field: { ref, ...fields },
                          fieldState: { error },
                        }) => (
                          <TextField
                            variant="outlined"
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
                              mt: 2,
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
                            label="Title"
                            fullWidth
                            {...fields}
                            inputRef={ref}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                            onKeyUp={() => {
                              trigger("title");
                            }}
                          />
                        )}
                      />
                    </Box>
                  </Box>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <Box
                    sx={{
                      backgroundColor: "#ED2228",
                      width: "50px",
                      height: "50px",
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography color="white">3</Typography>
                  </Box>
                </TimelineSeparator>
                <TimelineContent>
                  <Box
                    sx={{
                      width: "100%",
                      height: "auto",

                      borderRadius: "8px",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <Box p={5}>
                      <Typography
                        color="black"
                        variant="h6"
                        sx={{ fontSize: "10px !important" }}
                      >
                        Please enter additional information
                      </Typography>
                      <Controller
                        name="additionalInformation"
                        control={control}
                        defaultValue=""
                        render={({
                          field: { ref, ...fields },
                          fieldState: { error },
                        }) => (
                          <TextField
                            variant="outlined"
                            InputProps={{
                              style: {
                                fontSize: "12px !important",

                                color: "#000 !important",
                              },
                            }}
                            InputLabelProps={{
                              style: {
                                fontSize: "12px !important",
                                color: "black",
                              },
                            }}
                            sx={{
                              mt: 2,
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
                            multiline
                            rows={5}
                            label="Additional Information"
                            fullWidth
                            {...fields}
                            inputRef={ref}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                            onKeyUp={() => {
                              trigger("additionalInformation");
                            }}
                          />
                        )}
                      />
                    </Box>
                  </Box>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
            <Box
              sx={{
                position: "sticky",
                width: "100%",
                bottom: "0",
                zIndex: "200",
                backgroundColor: "white",
                height: "50px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Button
                onClick={props.onClose}
                variant="text"
                color="error"
                sx={{
                  width: "40%",
                  height: "40px",
                }}
              >
                <Typography variant="subtitle2">Cancel</Typography>
              </Button>
              <LoadingButton
                loading={isLoading}
                variant="contained"
                color="secondary"
                onClick={handleSubmit(onSubmit)}
                sx={{
                  width: "40%",
                  height: "40px",
                  backgroundColor: "#252B33",
                }}
              >
                <Typography variant="subtitle2" color="white">
                  Submit
                </Typography>
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Book;
