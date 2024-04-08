import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useWidth } from "../../../hooks/useWidth";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import DoctorProfileSidebar from "../../../components/DoctorProfileSidebar";
import image from "../../../assets/images/test-image.png";
import { format } from "date-fns";
import { getDecodedJwt } from "./../../../utils/auth";
import {
  fetchAnnouncementsDoctor,
  updateStatusToRead,
} from "../services/doctorService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAlert } from "../../../context/NotificationProvider";
import { Add } from "@mui/icons-material";
import NewAnnouncement from "../components/Announcements.js/NewAnnouncement";

const Announcements = () => {
  const { isMobile } = useWidth();
  const queryClient = useQueryClient();
  const decodedUser = getDecodedJwt();
  const doctorId = decodedUser.id;
  const [newPost, setNewPost] = useState(false);

  const { showNotification } = useAlert();

  const handleErrors = (error) => {
    
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
  }

  const { isLoading, data } = useQuery(
    ["announcements", { doctorId: doctorId }],
    fetchAnnouncementsDoctor,
    {
      enabled: doctorId !== null || doctorId !== undefined,
      onError: (error) => {
        handleErrors(error)
      },
    }
  );

  // Update to read
  const mutation = useMutation(updateStatusToRead, {
    onError: (error) => {
      handleErrors(error)
    },

    onSuccess: (data) => {
      // Get all announcements again
      queryClient.refetchQueries("announcements");
    },
  });

  // ...
  const getAnnouncementSection = (timestamp) => {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const announcementDate = new Date(timestamp).toLocaleDateString();

    if (announcementDate === today) {
      return "Today";
    } else if (announcementDate === yesterday.toLocaleDateString()) {
      return "Yesterday";
    } else {
      return "Later";
    }
  };

  const sortedAnnouncements = isLoading
    ? []
    : data?.data?.sort((a, b) => {
        const timestampA = new Date(a.timestamp)?.getTime();
        const timestampB = new Date(b.timestamp)?.getTime();
        const announcementDateA = new Date(a.timestamp)?.toLocaleDateString();
        const announcementDateB = new Date(b.timestamp)?.toLocaleDateString();

        if (announcementDateA === announcementDateB) {
          // Sort based on the latest announcement within the same date
          return timestampB - timestampA;
        }

        // Sort based on the date in descending order
        const dateA = new Date(a.timestamp)?.getTime();
        const dateB = new Date(b.timestamp)?.getTime();
        return dateB - dateA;
      });

  const announcementSections = sortedAnnouncements?.reduce((sections, item) => {
    const section = getAnnouncementSection(item.timestamp);
    if (!sections[section]) {
      sections[section] = [];
    }
    sections[section].push(item);
    return sections;
  }, {});

  const unreadAnnouncements = isLoading
    ? []
    : data?.data?.filter((item) => {
        return item.doctorStatus.some((stat) => {
          return stat.status === "unread" && stat.doctorId === doctorId;
        });
      });

  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const handleShowMoreClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    const announcementId = announcement._id; // Replace with the actual announcementId
    const queryKey = ["updateStatus", { doctorId, announcementId }];
    mutation.mutate({ queryKey });
  };

  const handleCloseDialog = () => {
    setSelectedAnnouncement(null);
  };


  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: "auto", md: "100vh" },
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: "#F5F5F5",
            width: isMobile ? "100%" : "calc(100% - 250px)",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "space-between",
            boxSizing: "border-box",
            pb: 10
          }}
        >
          <Box sx={{ width: "100%", pl: 8, pr: 8, backgroundColor: "#F5F5F5" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #E2E5FB",
                paddingBottom: "20px",
                pt: 10,
              }}
            >
              <Box sx={{ pl: 4 }}>
                <Typography
                  variant="h3"
                  sx={{ color: "black", fontSize: { xs: "24px !important" } }}
                >
                  Announcements
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "black", fontWeight: 400, letterSpacing: 1 }}
                >
                  You have{" "}
                  <span style={{ fontWeight: 600, color: "#ED2228" }}>
                    {unreadAnnouncements?.length}
                  </span>{" "}
                  unread announcements.
                </Typography>
              </Box>
              <Button
                disableElevation
                variant="contained"
                startIcon={<Add />}
                sx={{ borderRadius: "14px", height: "fit-content" }}
                onClick={() => setNewPost(true)}
              >
                New Announcement
              </Button>
            </Box>

            {Object.entries(announcementSections).map(([section, items]) => (
              <React.Fragment key={section}>
                <Typography
                  variant="h3"
                  sx={{ color: "#AEAEAE", margin: "20px 0" }}
                >
                  {section}
                </Typography>

                {items.map((item, pos) => (
                  <Box
                    key={pos}
                    sx={{
                      position: "relative",
                      background: item.doctorStatus?.some(
                        (status) =>
                          status.doctorId === doctorId &&
                          status.status === "read"
                      )
                        ? "#fff"
                        : "#E2E5FB",
                      border: "0.5px solid #D1D1D1",
                      borderRadius: "5px",
                      marginBottom: "5px",
                      padding: "7px 11px",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={image}
                      alt="profile"
                      width="50px"
                      height="50px"
                      borderRadius="50%"
                    />
                    <Box
                      sx={{
                        flex: "1",
                        width: "70%",
                        marginLeft: "10px",
                        overflow: "hidden",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontSize: { xs: "16px !important" } }}
                        color="black"
                      >
                        {item.name}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          sx={{
                            wordWrap: "break-word",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            hyphens: "auto",
                            wordBreak: "break-all",
                            maxWidth: "70%",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                          }}
                          variant="caption"
                          color="black"
                        >
                          {item.text}
                        </Typography>
                        <Typography
                          onClick={() => handleShowMoreClick(item)}
                          variant="caption"
                          sx={{ color: "#AEAEAE", cursor: "pointer" }}
                        >
                          .show more
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      )}
      {!isMobile && <DoctorProfileSidebar width="250px" />}
      <Dialog open={selectedAnnouncement !== null} onClose={handleCloseDialog}>
        {selectedAnnouncement && (
          <>
            <DialogTitle
              variant="h4"
              sx={{ fontSize: { xs: "18px !important" } }}
              color="black"
            >
              {selectedAnnouncement?.name}
            </DialogTitle>
            <DialogContent>
              <Typography
                color="black"
                variant="body1"
                sx={{
                  fontSize: { xs: "14px !important", md: "16px !important" },
                }}
              >
                {selectedAnnouncement?.text}
              </Typography>
              <Typography variant="caption" marginTop="20px">
                Date:{" "}
                {format(
                  new Date(
                    selectedAnnouncement.timestamp.replace(
                      /(\d{2})\/(\d{2})\/(\d{4})/,
                      "$2/$1/$3"
                    )
                  ),
                  "dd/MM/yyyy"
                )}
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>

      <NewAnnouncement
        open={newPost}
        onClose={() => {
          setNewPost(false);
          queryClient.refetchQueries("announcements");
        }}
      />
    </>
  );
};

export default Announcements;
