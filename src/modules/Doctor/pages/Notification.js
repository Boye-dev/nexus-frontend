import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";
import Notify from "../components/Notifications/Notify";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getDecodedJwt } from "../../../utils/auth";
import { fetchNotifications, markReadAll } from "../services/doctorService";
import { useAlert } from "../../../context/NotificationProvider";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
const Notification = () => {
  const decodedUser = getDecodedJwt();
  const { showNotification } = useAlert();
  const [value, setValue] = React.useState(0);
  const queryClient = useQueryClient();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const { isLoading: allLoading, data: allNotifications } = useQuery(
    ["notifications", { userId: decodedUser.id }],
    fetchNotifications,
    {
      onError: (error) => {
        showNotification?.(error?.response?.data?.message || error.message, {
          type: "error",
        });
      },
    }
  );
  const { isLoading: readLoading, data: readNotifications } = useQuery(
    ["read-notifications", { userId: decodedUser.id, status: "read" }],
    fetchNotifications,
    {
      onError: (error) => {
        showNotification?.(
          error.response?.data?.message ||
            error.response.error ||
            error.message,
          { type: "error" }
        );
      },
    }
  );
  const { isLoading: unreadLoading, data: unreadNotifications } = useQuery(
    ["unread-notifications", { userId: decodedUser.id, status: "unread" }],
    fetchNotifications,
    {
      onError: (error) => {
        showNotification?.(error.response?.data?.message || error.message, {
          type: "error",
        });
      },
    }
  );

  const { mutate, isLoading: submitLoading } = useMutation(markReadAll, {
    onError: (error) => {
      showNotification?.(error.response.data.errors[0] || error.message, {
        type: "error",
      });
    },
    onSuccess: (data) => {
      showNotification?.(data.message, { type: "success" });
      queryClient.refetchQueries("notifications");
      queryClient.refetchQueries("unread-notifications");
      queryClient.refetchQueries("read-notifications");
    },
  });
  const markRead = () => {
    const payload = { userId: decodedUser.id };
    mutate(payload);
  };
  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
        pb: 10,
      }}
    >
      <Box
        sx={{
          width: "100%",

          backgroundColor: "#F5F5F5",
          height: "auto",
          pb: 10,
        }}
      >
        <Box
          sx={{
            pt: 10,
            pl: 8,
            paddingBottom: "30px",
            borderBottom: "1px solid #E2E5FB",
            marginBottom: "20px",
          }}
        >
          <Typography
            variant="h3"
            sx={{ color: "black", fontSize: { xs: "24px !important" } }}
          >
            Notifications
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "black", fontWeight: 400, letterSpacing: 1 }}
          >
            You have{" "}
            <span style={{ fontWeight: 600, color: "#ED2228" }}>
              {unreadNotifications?.data.notifications.length}
            </span>{" "}
            unread notifications.
          </Typography>
        </Box>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label={
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "18px",
                      fontWeight: 500,
                      color: value === 0 ? "#ED2228" : "black",
                    }}
                  >
                    All
                  </Typography>
                }
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "18px",
                      fontWeight: 500,
                      color: value === 1 ? "#ED2228" : "black",
                    }}
                  >
                    Read
                  </Typography>
                }
                {...a11yProps(1)}
              />
              <Tab
                label={
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "18px",
                      fontWeight: 500,
                      color: value === 2 ? "#ED2228" : "black",
                    }}
                  >
                    Unread
                  </Typography>
                }
                {...a11yProps(2)}
              />
              {/* <Tab label="Password" {...a11yProps(1)} /> */}
            </Tabs>
          </Box>
          <Box
            onClick={markRead}
            sx={{
              width: "120px",
              cursor: "pointer",
              backgroundColor: "#ED2228",

              p: 2,
              m: 2,
              borderRadius: "8px",
            }}
          >
            <Typography variant="caption" color="white">
              Mark all as read
            </Typography>
          </Box>
        </Box>
        <TabPanel value={value} index={0}>
          {allLoading ? (
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
            <Box sx={{ width: "100%", minHeight: "100vh" }}>
              <Box
                sx={{
                  pl: 8,
                  pr: 8,
                }}
              >
                {allNotifications.data.notifications.map((item) => {
                  return <Notify notification={item} />;
                })}
              </Box>
            </Box>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {readLoading ? (
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
            <Box sx={{ width: "100%", minHeight: "100vh" }}>
              <Box
                sx={{
                  pl: 8,
                  pr: 8,
                }}
              >
                {readNotifications.data.notifications.map((item) => {
                  return <Notify notification={item} />;
                })}
              </Box>
            </Box>
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {unreadLoading ? (
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
            <Box sx={{ width: "100%", minHeight: "100vh" }}>
              <Box
                sx={{
                  pl: 8,
                  pr: 8,
                }}
              >
                {unreadNotifications.data.notifications.map((item) => {
                  return <Notify notification={item} />;
                })}
              </Box>
            </Box>
          )}
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Notification;
