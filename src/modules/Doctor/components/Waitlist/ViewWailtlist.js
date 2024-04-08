import { Close } from "@mui/icons-material";
import { Box, Divider, Drawer, Typography } from "@mui/material";
import { useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { useAlert } from "../../../../context/NotificationProvider";
import {
  approveAppointment,
  declineAppointment,
} from "../../services/doctorService";
import { LoadingButton } from "@mui/lab";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { getDecodedJwt } from "../../../../utils/auth";
import { useEffect } from "react";

const textFieldStyle = {
  width: "100%",
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
export const convertToWAT = (utcString) => {
  const utcDate = new Date(utcString);
  const watOffset = 60; // West African Time offset in minutes (+01:00)
  const watTimestamp = utcDate.getTime() + watOffset * 60000; // Convert offset to milliseconds

  const watDate = new Date(watTimestamp);
  return watDate.toISOString();
};

const ViewWaitlist = (props) => {
  const { showNotification } = useAlert();
  const decodedUser = getDecodedJwt();
  const doctorId = decodedUser.id;

  const [approve, setApprove] = useState(false);

  const handleStartDateTimeChange = (date) => {
    const watDateTime = new Date(date);
    setValue("startDateTime", watDateTime);
  };
  const handleEndDateTimeChange = (date) => {
    const watDateTime = new Date(date);

    setValue("endDateTime", watDateTime);
  };

  const schema = yup.object().shape({
    startDateTime: yup
      .date()
      .required("Start date And Time Is Required")
      .test(
        "startDateTime",
        "Start date and time should be in the future",
        function (value) {
          if (!value) {
            // Don't perform the comparison if the value is missing
            return true;
          }

          const currentDate = new Date();
          const startDate = new Date(value);

          return startDate > currentDate;
        }
      ),
    endDateTime: yup
      .date()
      .required("End date And Time Is Required")
      .test(
        "endDateTime",
        "End date and time should not be less than start date and time",
        function (value) {
          const { startDateTime } = this.parent;
          if (!startDateTime || !value) {
            // Don't perform the comparison if either value is missing
            return true;
          }

          const startDate = new Date(startDateTime);
          const endDate = new Date(value);

          return endDate >= startDate;
        }
      ),
  });

  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { startDateTime, endDateTime } = watch();

  const { mutate: mutateDecline, isLoading: declineLoading } = useMutation(
    declineAppointment,
    {
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
              error ||
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
    }
  );
  const onSubmitDecline = () => {
    const payload = {
      appointmentId: props.appointmentData._id,
    };
    mutateDecline(payload);
  };

  const { mutate: mutateApprove, isLoading: approveLoading } = useMutation(
    approveAppointment,
    {
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
    }
  );

  const onSubmitApprove = (data) => {
    const payload = {
      appointmentId: props.appointmentData._id,
      startDateTime: convertToWAT(data?.startDateTime),
      endDateTime: convertToWAT(data?.endDateTime),
      doctorId: doctorId,
    };

    mutateApprove(payload);
  };

  useEffect(() => {
    setApprove(false);
  }, [props.appointmentData]);

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
                Waitlist Information
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
                      backgroundColor: props.appointmentData
                        .additionalInformation
                        ? "#ED2228"
                        : "#F3F5F9",
                      width: "50px",
                      height: "50px",
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      color={
                        props.appointmentData.additionalInformation
                          ? "white"
                          : "black"
                      }
                    >
                      1
                    </Typography>
                  </Box>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Box
                    sx={{
                      width: "100%",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <Box p={5}>
                      <Typography
                        color="black"
                        variant="h5"
                        // sx={{ fontSize: "10px !important" }}
                      >
                        Meeting Information
                      </Typography>
                      <Box
                        sx={{
                          mt: 4,
                          height: "130px",
                          backgroundColor: "#D9D9D9",
                          borderTopLeftRadius: "8px",
                          borderTopRightRadius: "8px",
                          borderBottom: "1px solid black",
                          overflowY: "auto",
                        }}
                      >
                        <Box p={2}>
                          <Typography color="black" variant="body2">
                            {props.appointmentData.additionalInformation}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem sx={{ visibility: approve ? "visible" : "hidden" }}>
                <TimelineSeparator>
                  <Box
                    sx={{
                      backgroundColor:
                        startDateTime && endDateTime ? "#ED2228" : "#F3F5F9",

                      width: "50px",
                      height: "50px",
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      color={startDateTime && endDateTime ? "white" : "black"}
                    >
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
                      <Typography color="black" variant="h5" sx={{ mb: 3 }}>
                        SCHEDULE
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDateTimePicker
                          sx={textFieldStyle}
                          label="Start Date and Time"
                          inputVariant="outlined"
                          // value={selectedDateTime}
                          fullwidth
                          onChange={handleStartDateTimeChange}
                        />
                      </LocalizationProvider>
                      <Typography variant="caption" color="red">
                        {errors?.startDateTime?.message}
                      </Typography>
                    </Box>
                    <Box p={5}>
                      {/* <Typography
                        color="black"
                        variant="h5"
                        sx={{ mb: 3 }}
                      >
                        Please enter the end date and time for the appointment
                      </Typography> */}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDateTimePicker
                          sx={textFieldStyle}
                          label="End Date and Time"
                          inputVariant="outlined"
                          // value={selectedDateTime}
                          fullwidth
                          onChange={handleEndDateTimeChange}
                        />
                      </LocalizationProvider>
                      <Typography variant="caption" color="error">
                        {errors?.endDateTime?.message}
                      </Typography>
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
              <LoadingButton
                onClick={onSubmitDecline}
                loading={declineLoading}
                variant="text"
                color="error"
                sx={{
                  width: "40%",
                  height: "40px",
                  visibility: approve ? "hidden" : "visible",
                }}
              >
                <Typography variant="subtitle2" color="red">
                  Decline
                </Typography>
              </LoadingButton>
              <LoadingButton
                loading={approveLoading}
                variant="contained"
                color="secondary"
                onClick={
                  approve
                    ? handleSubmit(onSubmitApprove)
                    : () => setApprove(true)
                }
                sx={{
                  width: "40%",
                  height: "40px",
                  backgroundColor: "#252B33",
                }}
              >
                <Typography variant="subtitle2" color="white">
                  {approve ? "Schedule" : "Approve"}
                </Typography>
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ViewWaitlist;
