import {
  Box,
  Divider,
  Drawer,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import { ReactComponent as Logo } from "../../../assets/svgs/logo.svg";
import { ReactComponent as LogoSmall } from "../../../assets/svgs/logosmall.svg";
import SidebarMenu from "../../components/SidebarMenu";
import {
  DOCTOR_NAV_ITEMS,
  PATIENT_NAV_ITEMS,
} from "../../../constants/sidebarItems";
import { useLocation } from "react-router-dom";
import { getDecodedJwt, isAuthenticated, logOut } from "../../../utils/auth";
import { fetchUser, fetchUserDoctor } from "../../../services/authService";
import { useQuery } from "react-query";
import { useAlert } from "../../../context/NotificationProvider";
import { useNavigate } from "react-router-dom/dist";
import { Logout, SettingsOutlined } from "@mui/icons-material";

const PatientSidebar = (props) => {
  const location = useLocation();
  const decodedUser = getDecodedJwt();
  const { showNotification } = useAlert();
  const navigate = useNavigate();
  const navItems =
    decodedUser.role === "PATIENT" ? PATIENT_NAV_ITEMS : DOCTOR_NAV_ITEMS;
  const { isLoading, data } = useQuery(
    ["patient_by_id", { patientId: decodedUser.id }],
    fetchUser,
    {
      enabled:
        isAuthenticated() &&
        decodedUser.role === "PATIENT" &&
        decodedUser.id !== null &&
        decodedUser.id !== undefined,
      onError: (error) => {
        showNotification?.(error.response?.data?.message || error.message, {
          type: "error",
        });
      },
    }
  );
  const { isLoading: isLoadingDoctor, data: doctorDat } = useQuery(
    ["doctor_by_id", { doctorId: decodedUser.id }],
    fetchUserDoctor,
    {
      enabled:
        isAuthenticated() &&
        decodedUser.role === "DOCTOR" &&
        decodedUser.id !== null &&
        decodedUser.id !== undefined,
      onError: (error) => {
        showNotification?.(error.response?.data?.message || error.message, {
          type: "error",
        });
      },
    }
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box>
        <Drawer
          variant={props.isMobile ? "temporary" : "permanent"}
          open={props.open}
          sx={{ width: props.width }}
          onClose={() => props.setOpen(false)}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box sx={{ width: props.width }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "130px",
                  width: "100%",
                }}
              >
                {props.width === 220 ? <Logo /> : <LogoSmall />}
              </Box>

              <Box sx={{ width: "100%" }}>
                {navItems
                  .filter((item) => item.bottom === false)
                  .map((item, index) => {
                    return (
                      <SidebarMenu
                        collapse={props.collapse}
                        item={item}
                        key={item.name}
                        width={props.width}
                        isMobile={props.isMobile}
                        onClose={() => props.setOpen(false)}
                        isActive={location.pathname.includes(item.url)}
                      />
                    );
                  })}
              </Box>
            </Box>
            <Box>
              <Box>
                {navItems
                  .filter((item) => item.bottom === true)
                  .map((item, index) => {
                    return (
                      <SidebarMenu
                        collapse={props.collapse}
                        item={item}
                        key={item.name}
                        width={props.width}
                        isMobile={props.isMobile}
                        onClose={() => props.setOpen(false)}
                        isActive={location.pathname.includes(item.url)}
                      />
                    );
                  })}
              </Box>
              <Divider mt={3} />
              {isLoadingDoctor || isLoading || (
                <>
                  <Box
                    onClick={handleClick}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      width: "100%",
                      pt: 3,
                      pb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "100%",
                      }}
                    >
                      <img
                        src={
                          data?.data?.profilePicture ||
                          doctorDat?.data?.profilePicture
                        }
                        alt=""
                        width="100%"
                        height="100%"
                        style={{ borderRadius: "100%" }}
                      />
                    </Box>
                    {props.width === 220 && (
                      <Typography color="black" variant="h6" ml={2}>
                        {data?.data?.lastName || doctorDat?.data?.lastName}{" "}
                        {data?.data?.firstName || doctorDat?.data?.firstName}
                      </Typography>
                    )}
                  </Box>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    sx={{ width: 200 }}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      color="black"
                      sx={{ width: "220px" }}
                      onClick={
                        data?.data
                          ? () => {
                              navigate("/patient/settings");
                              handleClose();
                            }
                          : () => {
                              navigate("/doctor/settings");
                              handleClose();
                            }
                      }
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <SettingsOutlined sx={{ color: "black" }} />
                        <Typography
                          color="black"
                          variant="h6"
                          sx={{ marginLeft: "10px" }}
                        >
                          Settings
                        </Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem
                      color="black"
                      onClick={() => {
                        logOut();
                        handleClose();
                        decodedUser.role === "PATIENT"
                          ? navigate("/signin")
                          : navigate("/signin-doctor");
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Logout sx={{ color: "black" }} />
                        <Typography
                          color="black"
                          variant="h6"
                          sx={{ marginLeft: "10px" }}
                        >
                          Logout
                        </Typography>
                      </Box>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default PatientSidebar;
