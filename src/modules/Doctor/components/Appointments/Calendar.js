import React from "react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import Fullcalendar from "@fullcalendar/react";
import "../../../../styles/calendar.css";
import { useState } from "react";
import EventDrawer from "./EventDrawer";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { fetchUpcoming } from "../../services/doctorService";
import { getDecodedJwt } from "../../../../utils/auth";
import { useAlert } from "../../../../context/NotificationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  // MenuItem,
  Popover,
  // TextField,
  Typography,
} from "@mui/material";
import {
  AccessTime,
  CalendarMonth,
  HourglassBottom,
  LocalHospital,
} from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  formatDate,
  getDuration,
  getFormattedTime,
} from "../../../../utils/formatDate";
import { cancel, reschedule } from "../../../Patient/services/patientService";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { convertToWAT } from "../Waitlist/ViewWailtlist";
// import moment from "moment/moment";
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
function Calendar(props) {
  const [event, setEvent] = useState(false);
  const { showNotification } = useAlert();
  const decodedUser = getDecodedJwt();
  const doctorId = decodedUser.id;

  const { isLoading: upcomingLoading, data: upcoming } = useQuery(
    ["upcoming_app", { doctorId: doctorId }],
    fetchUpcoming,
    {
      enabled: doctorId !== null || doctorId !== undefined,
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
    }
  );
  const convertedData =
    upcomingLoading ||
    upcoming?.data.map((data) => {
      return {
        appointmentId: data._id,
        title: data.title,
        status: data.status,
        patientId: data.patientId,
        specialty: data.specialty,
        start: data.startDateTime,
        end: data.endDateTime,
        additionalInformation: data.additionalInformation,
        timeZone: "Africa/Lagos",
      };
    });

  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rescheduleApp, setReshedule] = useState(null);

  const handleEventClick = (clickInfo) => {
    const { clientX, clientY } = clickInfo.jsEvent;
    setPopoverAnchorEl({ left: clientX, top: clientY });
    setSelectedEvent(clickInfo.event);
  };
  const queryClient = useQueryClient();

  const closePopover = () => {
    setPopoverAnchorEl(null);
    setSelectedEvent(null);
  };
  const { mutate, isLoading } = useMutation(cancel, {
    onError: (error) => {
      showNotification?.(error.response.data.errors[0] || error.message, {
        type: "error",
      });
    },
    onSuccess: (data) => {
      setSelectedEvent(null);
      setPopoverAnchorEl(null);
      queryClient.refetchQueries("upcoming_app");

      showNotification?.(data.message, { type: "success" });
    },
  });
  const { mutate: mutateReschedule, isLoading: isRescheduling } = useMutation(
    reschedule,
    {
      onError: (error) => {
        showNotification?.(error.response.data.errors[0] || error.message, {
          type: "error",
        });
      },
      onSuccess: (data) => {
        setSelectedEvent(null);
        setPopoverAnchorEl(null);
        setReshedule(null);
        queryClient.refetchQueries("upcoming_app");

        showNotification?.(data.message, { type: "success" });
      },
    }
  );
  const onCancel = (appointmentId) => {
    const payload = {
      appointmentId,
      userId: decodedUser.id,
    };

    mutate(payload);
  };
  const handleCloseDialog = () => {
    setReshedule(null);
  };
  const schema = yup.object().shape({
    startDateTime: yup.string().required("Start date And Time Is Required"),
    endDateTime: yup.string().required("End date And Time Is Required"),
  });
  const defaultValues = {
    startDateTime: "",
    endDateTime: "",
  };
  const allTimes = [];

  for (let hours = 0; hours < 24; hours++) {
    const hour = hours % 12 || 12;
    const period = hours < 12 ? "am" : "pm";
    const time = `${hour}${period}`;
    allTimes.push(time);
  }
  const {
    // control,
    handleSubmit,
    // formState: { errors },
    // trigger,
    // watch,
    // reset,
    setValue,
    // getValues,
    // unregister,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });
  const handleStartDateTimeChange = (date) => {
    setValue("startDateTime", date);
  };
  const handleEndDateTimeChange = (date) => {
    setValue("endDateTime", date);
  };
  // const { startDateTime, endDateTime } = watch();

  const onReschedule = (payload) => {
    payload = {
      appointmentId: rescheduleApp,
      doctorId,
      startDateTime: convertToWAT(payload?.startDateTime),
      endDateTime: convertToWAT(payload?.endDateTime),
    };

    mutateReschedule(payload);
  };
  return (
    <div>
      {upcomingLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div style={{ position: "relative" }}>
            <Fullcalendar
              events={convertedData}
              timeZone="Africa/Lagos"
              dayMaxEvents={true}
              nowIndicator={true}
              eventClick={handleEventClick}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={"timeGridWeek"}
              headerToolbar={{
                start: "today prev,next", // will normally be on the left. if RTL, will be on the right
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
              }}
              height={"90vh"}
            />
            <Popover
              open={Boolean(popoverAnchorEl)}
              onClose={closePopover}
              anchorReference="anchorPosition"
              anchorPosition={popoverAnchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {selectedEvent && (
                <div
                  style={{
                    width: "350px",
                    height: "500px",
                  }}
                >
                  <Box sx={{ padding: "30px 20px" }}>
                    <Typography color="black" variant="h5" pb={1}>
                      {selectedEvent.title}
                    </Typography>
                    <Box display="flex">
                      <img
                        src={
                          selectedEvent.extendedProps?.patientId?.profilePicture
                        }
                        alt=""
                        style={{
                          width: "19px",
                          height: "19px",
                          borderRadius: "100%",
                          marginRight: "5px",
                        }}
                      />
                      <Typography color="black" variant="body2" pb={5}>
                        {selectedEvent.extendedProps?.patientId.lastName}{" "}
                        {selectedEvent.extendedProps?.patientId.firstName}
                      </Typography>
                    </Box>
                    <Divider />
                    <Grid container mt={5}>
                      <Grid item xs={6} height="70px">
                        <Box
                          sx={{
                            display: "flex",

                            alignItems: "center",
                          }}
                        >
                          <CalendarMonth />
                          <Box ml={5}>
                            <Typography color="text.secondary" variant="body2">
                              Date
                            </Typography>
                            <Typography color="black" variant="h6">
                              {formatDate(selectedEvent._instance?.range.start)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6} height="70px">
                        <Box
                          sx={{
                            display: "flex",

                            alignItems: "center",
                          }}
                        >
                          <AccessTime />
                          <Box ml={5}>
                            <Typography color="text.secondary" variant="body2">
                              Time
                            </Typography>
                            <Typography color="black" variant="h6">
                              {getFormattedTime(
                                selectedEvent._instance.range?.start
                              )}{" "}
                              -{" "}
                              {getFormattedTime(
                                selectedEvent._instance?.range.end
                              )}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6} height="70px">
                        <Box
                          sx={{
                            display: "flex",

                            alignItems: "center",
                          }}
                        >
                          <LocalHospital />
                          <Box ml={5}>
                            <Typography color="text.secondary" variant="body2">
                              Specialty
                            </Typography>
                            <Typography color="black" variant="h6">
                              {selectedEvent.extendedProps?.specialty}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6} height="70px">
                        <Box
                          sx={{
                            display: "flex",

                            alignItems: "center",
                          }}
                        >
                          <HourglassBottom />
                          <Box ml={5}>
                            <Typography color="text.secondary" variant="body2">
                              Duration
                            </Typography>
                            <Typography color="black" variant="h6">
                              {getDuration(
                                selectedEvent._instance.range.start,
                                selectedEvent._instance.range.end
                              ).hours > 0 &&
                                getDuration(
                                  selectedEvent._instance.range.start,
                                  selectedEvent._instance.range.end
                                ).hours}{" "}
                              {getDuration(
                                selectedEvent._instance.range.start,
                                selectedEvent._instance.range.end
                              ).hours > 0 &&
                                `hour${
                                  getDuration(
                                    selectedEvent._instance.range.start,
                                    selectedEvent._instance.range.end
                                  ).hours > 1
                                    ? "s"
                                    : ""
                                }`}{" "}
                              {getDuration(
                                selectedEvent._instance.range.start,
                                selectedEvent._instance.range.end
                              ).minutes > 0 &&
                                `${
                                  getDuration(
                                    selectedEvent._instance.range.start,
                                    selectedEvent._instance.range.end
                                  ).minutes
                                }minute${
                                  getDuration(
                                    selectedEvent._instance.range.start,
                                    selectedEvent._instance.range.end
                                  ).minutes > 1
                                    ? "s"
                                    : ""
                                }`}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider sx={{ height: "5px" }} />
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
                          {selectedEvent.extendedProps?.additionalInformation}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      <Button
                        onClick={() => {
                          setReshedule(
                            selectedEvent.extendedProps?.appointmentId
                          );
                        }}
                        variant="text"
                        sx={{
                          height: "50px",
                          width: "48%",
                          backgroundColor: "#EDEEF4",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          sx={{ fontSize: "10px !important" }}
                        >
                          Reschedule Appontment
                        </Typography>
                      </Button>
                      <LoadingButton
                        loading={isLoading}
                        onClick={() =>
                          onCancel(selectedEvent.extendedProps?.appointmentId)
                        }
                        variant="outlined"
                        color="error"
                        sx={{
                          height: "50px",
                          width: "48%",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "10px !important" }}
                        >
                          Cancel Appontment
                        </Typography>
                      </LoadingButton>
                    </Box>
                  </Box>
                </div>
              )}
            </Popover>
            <Dialog open={rescheduleApp !== null} onClose={handleCloseDialog}>
              {selectedEvent && (
                <>
                  <Box sx={{ width: "350px", height: "400px" }}>
                    <DialogTitle
                      variant="h4"
                      sx={{ fontSize: { xs: "18px !important" } }}
                      color="black"
                    >
                      Reschedule Appointment
                    </DialogTitle>
                    <DialogContent>
                      <Typography
                        variant="caption"
                        sx={{ fontSize: { xs: "14px !important" } }}
                        color="black"
                      >
                        Title - {selectedEvent.title}
                      </Typography>
                      <Typography
                        color="black"
                        variant="body1"
                        sx={{ fontSize: { xs: "14px !important" }, mb: 3 }}
                      >
                        Please select new start date and time
                      </Typography>
                      <Box p={5}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            sx={textFieldStyle}
                            label="Start Date and Time"
                            inputVariant="outlined"
                            // value={selectedDateTime}
                            fullwidth
                            onChange={handleStartDateTimeChange}
                          />
                        </LocalizationProvider>
                      </Box>
                      <Typography
                        color="black"
                        variant="body1"
                        sx={{ fontSize: { xs: "14px !important" }, mb: 3 }}
                      >
                        Please select new end date and time
                      </Typography>
                      <Box p={5}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            sx={textFieldStyle}
                            label="End Date and Time"
                            inputVariant="outlined"
                            // value={selectedDateTime}
                            fullwidth
                            onChange={handleEndDateTimeChange}
                          />
                        </LocalizationProvider>
                      </Box>
                      <LoadingButton
                        loading={isRescheduling}
                        onClick={handleSubmit(onReschedule)}
                        variant="text"
                        sx={{
                          height: "30px",
                          width: "100%",
                          backgroundColor: "#EDEEF4",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          sx={{ fontSize: "10px !important" }}
                        >
                          Reschedule Appontment
                        </Typography>
                      </LoadingButton>
                    </DialogContent>
                  </Box>
                </>
              )}
            </Dialog>
            <EventDrawer
              open={!!event}
              event={event}
              onClose={() => setEvent(null)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Calendar;
