import { NavigateNext, NotificationsNone } from "@mui/icons-material";
import { Box, CircularProgress, Drawer, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAuthenticatedUser } from "../hooks/useAuthenticatedUser";
import { useAlert } from "../context/NotificationProvider";
import { useQuery } from "react-query";
import { fetchAppointments } from "../modules/Patient/services/patientService";
import PendingDrawer from "../modules/Patient/components/Dasboard/PendingDrawer";
import { Link, } from "react-router-dom";

const ProfileSidebar = (props) => {
  const { isLoading, userDetails } = useAuthenticatedUser();
  const { showNotification } = useAlert();
  const [open, setOpen] = useState(false);
  const color = ["#0FC916", "#FCBA03", "#6E00FF", "#F30505"];

  const { isLoading: isAppointmentLoading, data } = useQuery(
    [
      "appointments",
      {
        patientId: userDetails?.data._id,
        status: "PENDING",
      },
    ],
    fetchAppointments,
    {
      enabled: isLoading === false,
      onError: (error) => {
        if (error.response && (error.response.status === 500 || error.response.status === 400)) {
        // Handle the 500 error here
        showNotification?.(error?.response?.data?.message || "Internal Server Error" , {
        type: "error",
        });
      } else {
        // Handle other errors
        console.log(error);
        showNotification?.(
        error?.response?.data?.errors[0] || error?.response?.data?.message ||
          error?.message ||
          error?.error ||
          "An error occurred",
        {
          type: "error",
        }
        );
      }
      },
    }
  );

  return (
    <>
      <Box sx={{}}>
        <Drawer
          variant="permanent"
          anchor="right"
          sx={{
            display: { xs: "none", md: "block" },
            width: { xs: "0", md: props.width },
          }}
        >
          <Box width={props.width}>
            {isLoading || isAppointmentLoading ? (
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: 10,
                  }}
                >
                  <Box
                    sx={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "100%",
                    }}
                  >
                    <img
                      src={userDetails?.data?.profilePicture}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Typography variant="h6" color="black">
                    {userDetails?.data?.lastName || "--"}{" "}
                    {userDetails?.data?.firstName || "--"}
                  </Typography>

                  {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LocationOn />
              </Box> */}
                </Box>
                <Box sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                      mb: 3,
                    }}
                  >
                    <Typography variant="h6" color="black">
                      Personal
                    </Typography>
                    <Link to={"/patient/settings"}>
                      <Box
                        sx={{
                          width: "25px",
                          height: "25px",
                          backgroundColor: (theme) => theme.palette.primary.main,
                          borderRadius: "5px",
                          cursor: "pointer"
                        }}
                      >
                        <NavigateNext sx={{cursor: "pointer"}} color="success" />
                      </Box>
                    </Link>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6" color="black">
                      DOB:
                    </Typography>
                    <Typography variant="caption" color="#787878">
                      {new Date(
                        userDetails?.data?.dateOfBirth
                      ).toLocaleDateString("en-US")}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6" color="black">
                      Phone:
                    </Typography>
                    <Typography variant="caption" color="#787878">
                      {userDetails?.data?.phoneNumber || "--"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6" color="black">
                      Address:
                    </Typography>
                    <Typography variant="caption" color="#787878">
                      {userDetails?.data?.address.slice(0, 13)}
                      {userDetails?.data?.address.length > 8 && "..."}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6" color="black">
                      Email:
                    </Typography>
                    <Typography
                      variant="caption"
                      color="#787878"
                      sx={{
                        textAlign: "right",
                        wordWrap: "break-word",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        hyphens: "auto",
                        wordBreak: "break-all",
                        width: "70%",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {userDetails?.data?.email || "--"}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ pl: 4, pr: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",

                        alignItems: "center",
                      }}
                    >
                      <NotificationsNone sx={{ color: "text.secondary" }} />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: "10px !important " }}
                      >
                        Pending Appointments
                      </Typography>
                    </Box>
                    <Typography
                      onClick={() => setOpen(true)}
                      variant="caption"
                      sx={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      Show All
                    </Typography>
                  </Box>
                  {data?.data?.appointments.length > 0 ? (
                    data?.data?.appointments.slice(0, 4).map((item, index) => {
                      return (
                        <>
                          <Box
                            key={item._id}
                            sx={{
                              width: "100%",
                              minHeight: "30px",
                              backgroundColor: "#F4F4F4",
                              borderTopRightRadius: "5px",
                              borderBottomRightRadius: "5px",
                              display: "flex",

                              mt: 3,
                              mb: 2,
                              justifyContent: "space-between",
                            }}
                          >
                            <Box display="flex" sx={{ width: "75%" }}>
                              <Box
                                sx={{
                                  width: "1.99px",
                                  height: "100%",
                                  borderRadius: "5px",
                                  backgroundColor: color[index],
                                }}
                              />
                              <Box
                                ml={5}
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                p={1}
                              >
                                <Typography color="black" variant="h6">
                                  {item?.title || "--"}
                                </Typography>
                                <Typography
                                  color="text.secondary"
                                  variant="caption"
                                >
                                  Doctor : Dr {item?.doctorId?.lastName || "--"}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </>
                      );
                    })
                  ) : (
                    <Typography variant="h6" mt={4} color="text.secondary">
                      No Pending Appointments
                    </Typography>
                  )}
                </Box>
                <PendingDrawer
                  open={open}
                  onClose={() => setOpen(false)}
                  data={data}
                />
              </>
            )}
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default ProfileSidebar;
