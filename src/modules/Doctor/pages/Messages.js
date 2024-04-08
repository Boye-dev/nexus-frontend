import { ChatBubbleOutline, Message } from "@mui/icons-material";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import React from "react";
import Chat from "../components/Messages/Chat";
import SingleMessage from "../components/Messages/SingleMessage";
import { useAlert } from "../../../context/NotificationProvider";
import { getDecodedJwt } from "../../../utils/auth";
import { useQuery, useMutation } from "react-query";
import { fetchChats, readMessages } from "../services/doctorService";
import { useState } from "react";
import { ReactComponent as Blob } from "../../../assets/svgs/blob.svg";
import { useContext } from "react";
import { NexusContext } from "../../../context/NexusContext";

const Messages = () => {
  const { showNotification } = useAlert();
  const [chat, setChat] = useState();
  const decodedUser = getDecodedJwt();
  const [showDrop, setShowdrop] = useState(true);
  const [search, setSearch] = useState("");
  const { socketRef, setNotification } = useContext(NexusContext);
  const [cleared, setCleared] = useState(false);
  const { isLoading, data } = useQuery(
    ["chats", { userId: decodedUser.id }],
    fetchChats,
    {
      enabled: decodedUser.id !== null || decodedUser.id !== undefined,
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
    }
  );
  const { mutate, isLoading: isPosting } = useMutation(readMessages, {
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
      setNotification([]);
      setCleared(!cleared);
    },
  });
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              backgroundColor: "#F5F5F5",
              width: "100%",
              height: { xs: "87.6vh", md: "100vh" },
              display: "flex",
            }}
          >
            <Box
              sx={{
                height: "100%",
                overflow: "auto",
                width: { xs: "100%", md: "400px" },
                display: { xs: showDrop ? "block" : "none", md: "block" },
                backgroundColor: "white",
              }}
            >
              <Box p={5}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100px",
                    width: "100%",
                  }}
                >
                  <Typography variant="h3" sx={{ color: "black" }}>
                    Messages
                  </Typography>
                  <Message color="primary" />
                </Box>
                <TextField
                  placeholder="Search"
                  size="small"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  multiline
                  fullWidth
                  sx={{
                    color: "black",
                    border: "none",
                    borderColor: "",
                    outline: "none",
                    background: "#F5F5F6",
                    borderRadius: "5px",
                    "& .MuiInputBase-input": {
                      outline: "none",
                      borderRadius: "3px",
                      border: "none",
                      borderColor: "",

                      color: "#000",
                    },
                    "& .MuiInputBase-input:hover": {
                      border: "none",
                      borderColor: "",

                      outline: "none",
                      borderRadius: "5px",
                      color: "#000",
                    },
                    "& .MuiFormHelperText-root": {
                      color: "red !important",
                      background: "#fff",
                      width: "100%",
                      margin: 0,
                      border: "none",
                      borderColor: "",
                    },
                    "& .Mui-active": {
                      border: "none",
                      borderColor: "",
                      borderRadius: "5px",
                    },
                    "& .Mui-focused": {
                      border: "none",
                      borderColor: "",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        border: "none",
                        borderColor: "", // Change the border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                        borderColor: "", // Change the border color when active/focused
                      },
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 3,
                    mb: 3,
                    position: "sticky",
                    top: "0",
                    p: 3,
                    backgroundColor: "white",
                  }}
                >
                  <ChatBubbleOutline fontSize="2px" />
                  <Typography variant="h6" color="black" ml={2}>
                    All Messages
                  </Typography>
                </Box>
                {isLoading ||
                  data?.data
                    .filter((item) => {
                      const chatData = item.users.filter(
                        (item) => item.userDetails._id !== decodedUser.id
                      );
                      return (
                        chatData[0].userDetails.firstName
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        chatData[0].userDetails.lastName
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      );
                    })
                    .map((item) => {
                      return (
                        <Chat
                          cleared={cleared}
                          chat={item}
                          onClick={() => {
                            if (item?.unreadMessages.length > 0) {
                              const unread = item?.unreadMessages?.filter(
                                (item) =>
                                  item?.userId?.userDetails._id ===
                                  decodedUser.id
                              );
                              const payload = {
                                chatId: item?._id,
                                userId: unread[0]?.userId?.userDetails?._id,
                              };
                              mutate(payload);
                            }
                            socketRef.current?.emit("leaveRoom", chat?._id);
                            socketRef.current?.emit("joinRoom", {
                              chat: item?._id,
                              userId: decodedUser.id,
                            });
                            setChat(item);
                            setShowdrop(false);
                            // socketRef.current.join(item._id);
                          }}
                        />
                      );
                    })}
              </Box>
            </Box>
            {chat ? (
              <SingleMessage
                chat={chat}
                showDrop={showDrop}
                onClose={() => {
                  socketRef.current?.emit("leaveRoom", chat?._id);
                  setShowdrop(true);
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: { xs: "none", md: "flex" },
                  height: "100vh",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: "70%", position: "relative" }}>
                    <Blob />
                    <Box
                      sx={{
                        position: "absolute",
                        top: "45%",
                        left: "30%",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "180% !important",
                          fontFamily: "'Fasthand', cursive !important",
                        }}
                      >
                        Please select a chat
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default Messages;
