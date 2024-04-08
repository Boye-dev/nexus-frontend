import { createContext, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { getDecodedJwt } from "../utils/auth";
import { useRef } from "react";
import socketIOClient from "socket.io-client";
import { Box, Typography } from "@mui/material";
import { Message } from "@mui/icons-material";

const ENDPOINT = "https://nexus-backend-n855.onrender.com";
const NexusContext = createContext({});

const NexusContextProvider = ({ children }) => {
  const decodedUser = getDecodedJwt();
  const userId = decodedUser.id;
  const socketRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [latestMessage, setLatestMessage] = useState(null);
  const [notification, setNotification] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);
  const [users, setUsers] = useState(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT);
  }, []);
  useEffect(() => {
    socketRef.current.emit("addUser", userId);

    socketRef.current.on("getUsers", (users) => {
      setUsers(users);
    });
    socketRef.current.on("getMessage", (data) => {
      setArrivalMessage(data.newMessageReceived);
    });
    socketRef.current.on("getLatestMessage", (data) => {
      setLatestMessage(data.newMessageReceived);
    });
    socketRef.current.on("getLatestMessage", (data) => {
      setLatestMessage(data.newMessageReceived);
    });
    socketRef.current.on("type", (data) => {
      setTyping(data);
    });
    socketRef.current.on("notification", (data) => {
      setNotification([data, ...notification]);
    });
    socketRef.current.on("stopType", (data) => {
      setTyping(data);
    });
  }, [notification, userId]);
  useEffect(() => {
    if (notification.length > 0) {
      setOpenNotification(true);
      setTimeout(() => {
        setOpenNotification(false);
      }, 3000);
    }
  }, [notification]);
  return (
    <NexusContext.Provider
      value={{
        socketRef,
        arrivalMessage,
        latestMessage,
        users,
        typing,
        notification,
        setTyping,
        setNotification,
      }}
    >
      {openNotification && (
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            boxShadow: "0 0 5px 0 gray",

            height: "80px",
            width: "200px",
            position: "fixed",
            top: 10,
            zIndex: 3000,
            right: 0,
            display: "flex",
            p: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Message color="primary" />
          <Typography color="primary" variant="h6" ml={2}>
            {notification[0]?.message}
          </Typography>
        </Box>
      )}
      {children}
    </NexusContext.Provider>
  );
};

export const useNexusContext = () => {
  return useContext(NexusContext);
};

export { NexusContext, NexusContextProvider };
