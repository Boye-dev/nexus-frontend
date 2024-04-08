import React from "react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import Fullcalendar from "@fullcalendar/react";
import "../../../../styles/calendar.css";
import { useState } from "react";
import EventDrawer from "./EventDrawer";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { cancel, fetchUpcoming } from "../../services/patientService";
import { getDecodedJwt } from "../../../../utils/auth";
import { useAlert } from "../../../../context/NotificationProvider";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Popover,
  Typography,
} from "@mui/material";
import {
  AccessTime,
  CalendarMonth,
  HourglassBottom,
  LocalHospital,
} from "@mui/icons-material";
import {
  formatDate,
  getDuration,
  getFormattedTime,
} from "../../../../utils/formatDate";
import { LoadingButton } from "@mui/lab";
function Calendar(props) {
  const [event, setEvent] = useState(false);
  const { showNotification } = useAlert();
  const decodedUser = getDecodedJwt();
  const patientId = decodedUser.id;
  const { isLoading: upcomingLoading, data: upcoming } = useQuery(
    ["upcoming_app", { patientId: patientId }],
    fetchUpcoming,
    {
      enabled: patientId !== null || patientId !== undefined,
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
        doctorId: data.doctorId,
        specialty: data.specialty,
        start: data.startDateTime,
        end: data.endDateTime,
        additionalInformation: data.additionalInformation,
        timeZone: "Africa/Lagos",
      };
    });
  const queryClient = useQueryClient();

  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleEventClick = (clickInfo) => {
    const { clientX, clientY } = clickInfo.jsEvent;
    setPopoverAnchorEl({ left: clientX, top: clientY });
    setSelectedEvent(clickInfo.event);
  };

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
  const onCancel = (appointmentId) => {
    const payload = {
      appointmentId,
      userId: decodedUser.id,
    };

    mutate(payload);
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
              events={convertedData || []}
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
                      {selectedEvent?.title || "--"}
                    </Typography>
                    <Box display="flex">
                      <img
                        src={
                          selectedEvent.extendedProps?.doctorId.profilePicture
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
                        Dr{" "}
                        {selectedEvent.extendedProps?.doctorId?.lastName ||
                          "--"}{" "}
                        {selectedEvent.extendedProps?.doctorId?.firstName ||
                          "--"}
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
                              {formatDate(
                                selectedEvent._instance?.range.start
                              ) || "--"}
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
                              ) || "--"}{" "}
                              -{" "}
                              {getFormattedTime(
                                selectedEvent._instance?.range.end
                              ) || "--"}
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
                              {selectedEvent.extendedProps?.specialty || "--"}
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
                                  ).minutes || "--"
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
                          {selectedEvent.extendedProps?.additionalInformation ||
                            "--"}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      {/* <Button
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
                      </Button> */}
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
