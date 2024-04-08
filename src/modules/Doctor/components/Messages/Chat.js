import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { getDecodedJwt } from "../../../../utils/auth";
import {
  formatDateTime,
  // formatDuration,
  // getFormattedTime,
} from "../../../../utils/formatDate";
import { NexusContext } from "../../../../context/NexusContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
const Chat = ({ chat, onClick, cleared }) => {
  const { latestMessage, typing, notification } = useContext(NexusContext);
  // const initialMessage =
    // chat?.latestMessage !== undefined ? chat?.latestMessage || "" : "";
  const decodedUser = getDecodedJwt();
  const [lastMessage, setLastMessage] = useState(chat?.latestMessage);
  const unread = chat.unreadMessages.filter(
    (item) => item.userId.userDetails._id === decodedUser.id
  );
  const [unreadCount, setUnreadCount] = useState(unread[0]?.unread);

  useEffect(() => {
    if (notification[0]?.sender[0]?.userId === chatData[0].userId) {
      if (notification.length > 0) {
        setUnreadCount(notification[0]?.unread);
      }
    } else {
      setUnreadCount(0);
    }
  }, [notification, cleared]);

  useEffect(() => {
    if (latestMessage) {
      const mainChatUsers = chat.users;
      const mainChatUserArray = mainChatUsers.map((item) => item.userId);
      const latestMessageArray = latestMessage.chat.users.map(
        (item) => item.userId
      );

      if (
        JSON.stringify(mainChatUserArray) === JSON.stringify(latestMessageArray)
      ) {
        setLastMessage(latestMessage);
      }
    }
  }, [latestMessage]);
  const chatData = chat.users.filter(
    (item) => item.userDetails._id !== decodedUser.id
  );

  return (
    <Box sx={{ cursor: "pointer" }} onClick={onClick}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box>
            <img
              src={chatData[0].userDetails.profilePicture}
              style={{ width: "50px", height: "50px", borderRadius: "100%" }}
              alt=""
            />
          </Box>
          <Box ml={2}>
            <Typography variant="h6" color="black">
              {chatData[0].userDetails.lastName}{" "}
              {chatData[0].userDetails.firstName}
            </Typography>
            <Typography
              sx={{
                color:
                  typing.typing &&
                  typing.sender[0].userId === chatData[0].userId
                    ? "#13D71B"
                    : "black",
              }}
              variant="caption"
            >
              {typing.typing && typing.sender[0].userId === chatData[0].userId
                ? "typing"
                : lastMessage !== undefined &&
                  `${lastMessage?.content?.substring(0, 15)}${
                    lastMessage?.content?.length > 15 ? "..." : ""
                  }`}
            </Typography>
          </Box>
        </Box>
        <Box alignItems="flex-end" display="flex" flexDirection="column">
          <Typography variant="caption" sx={{}} color="text.secondary">
            {lastMessage !== undefined && formatDateTime(lastMessage.updatedAt)}
          </Typography>
          {unreadCount > 0 && (
            <Box
              sx={{
                width: "15px",
                height: "15px",
                borderRadius: "100%",
                backgroundColor: "#F30505",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                color="white"
                sx={{ fontSize: "10px !important" }}
              >
                {unreadCount}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Divider sx={{ margin: "10px 0" }} />
    </Box>
  );
};

export default Chat;
