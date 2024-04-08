import { Close } from "@mui/icons-material";
import {
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
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { useAlert } from "../../../../context/NotificationProvider";
import { postAnnouncement } from "../../services/doctorService";
import { LoadingButton } from "@mui/lab";

const textFieldStyle = {
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
};

const NewAnnouncement = (props) => {
  const { showNotification } = useAlert();

  const schema = yup.object().shape({
    name: yup.string().required("Name Is Required"),
    title: yup.string().required("Title Is Required"),
    text: yup.string().required("Details Is Required"),
  });

  const { handleSubmit, trigger, control, watch, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { name, title, text } = watch();
  const { mutate, isLoading } = useMutation(postAnnouncement, {
    onError: (error) => {
      if (
        error.response &&
        (error.response.status === 500 || error.response.status === 400)
      ) {
        // Handle the 500 error here
        showNotification?.(
          error.response.data.message || "Internal Server Error",
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
                Add New Announcement
              </Typography>
              <Close
                sx={{ color: "black", cursor: "pointer" }}
                onClick={props.onClose}
              />
            </Box>
            <Divider />
            <Typography color="black" variant="body2" mt={5}>
              *Note: Please fill out the necessary information.{" "}
            </Typography>
          </Box>
          <Box>
            <Box sx={{ height: "90vh" }}>
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
                        backgroundColor: name ? "#ED2228" : "#F3F5F9",
                        width: "50px",
                        height: "50px",
                        borderRadius: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography color={name ? "white" : "black"}>
                        1
                      </Typography>
                    </Box>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box
                      sx={{
                        width: "100%",
                        //   height: "80px",

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
                          Enter your name
                        </Typography>
                        <Controller
                          name="name"
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
                              sx={textFieldStyle}
                              // label="Name"
                              fullWidth
                              {...fields}
                              inputRef={ref}
                              error={Boolean(error?.message)}
                              helperText={error?.message}
                              onKeyUp={() => {
                                trigger("name");
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
                        backgroundColor: title ? "#ED2228" : "#F3F5F9",

                        width: "50px",
                        height: "50px",
                        borderRadius: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography color={title ? "white" : "black"}>
                        2
                      </Typography>
                    </Box>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box
                      sx={{
                        width: "100%",
                        //   height: "80px",

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
                          Please enter a title for the Announcement
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
                              sx={textFieldStyle}
                              // label="Title"
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
                        backgroundColor: text ? "#ED2228" : "#F3F5F9",
                        width: "50px",
                        height: "50px",
                        borderRadius: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography color={text ? "white" : "black"}>
                        3
                      </Typography>
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
                          Please enter your announcement
                        </Typography>
                        <Controller
                          name="text"
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
                              sx={textFieldStyle}
                              multiline
                              rows={5}
                              // label="Announcement"
                              fullWidth
                              {...fields}
                              inputRef={ref}
                              error={Boolean(error?.message)}
                              helperText={error?.message}
                              onKeyUp={() => {
                                trigger("text");
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </Box>
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

export default NewAnnouncement;
