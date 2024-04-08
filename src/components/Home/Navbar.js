import React from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/svgs/logo.svg";
import { ReactComponent as Doctor } from "../../assets/svgs/doctorIcon.svg";
import {
  // KeyboardArrowLeft,
  KeyboardArrowRight,
  Logout,
  Person,
  SettingsOutlined,
} from "@mui/icons-material";
import { List, ListItemButton, Divider, SwipeableDrawer } from "@mui/material";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
// import LayersIcon from '@mui/icons-material/Layers';

const Navbar = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const navigate = useNavigate();

  const [anchorElSignup, setAnchorElSignup] = React.useState(null);
  const openSignup = Boolean(anchorElSignup);
  const handleSignupClick = (event) => {
    setAnchorElSignup(event.currentTarget);
  };
  const handleSignupClose = () => {
    setAnchorElSignup(null);
    toggleDrawer("left", false);
  };
  const [anchorElSignin, setAnchorElSignin] = React.useState(null);
  const openSignin = Boolean(anchorElSignin);
  const handleSigninClick = (event) => {
    setAnchorElSignin(event.currentTarget);
  };
  const handleSigninClose = () => {
    setAnchorElSignin(null);
    toggleDrawer("left", false);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const scrollToSection = (event, sectionId) => {
    navigate("/home");
    event.preventDefault();
    const navbarHeight = document.getElementById("navbar").clientHeight; // Adjust this to match your navbar's ID
    const section = document.getElementById(sectionId);
    const offsetTop = section?.offsetTop - navbarHeight;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <Box
      id="navbar"
      sx={{
        backgroundColor: "#F8F9FA",
        height: "96px",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: "5000",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "100%", padding: { xs: "0 4%", md: "0 8%" } }}
      >
        <Box>
          <Logo />
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "space-around",
            width: "30%",
          }}
        >
          {[
            { link: "#", text: "Home", id: "home" },
            { link: "#about", text: "About Us", id: "about" },
            { link: "#contact", text: "Contact", id: "contact" },
          ].map((item) => {
            return (
              <Link
                to={item.link}
                onClick={(e) => scrollToSection(e, item.id)}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  color="text.primary"
                  variant="caption"
                  sx={{ fontWeight: 500, cursor: "pointer" }}
                >
                  {item.text}
                </Typography>
              </Link>
            );
          })}
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            // width: "30%",
          }}
        >
          <Box>
            <Button
              onClick={handleSigninClick}
              variant="body1"
              startIcon={<Person />}
            >
              Login
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorElSignin}
              open={openSignin}
              sx={{ width: 200, zIndex: "9999", marginTop: "12px" }}
              onClose={handleSigninClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                color="black"
                // sx={{ width: "220px" }}
                onClick={() => {
                  handleSigninClose();
                  navigate("/signin");
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {/* <SettingsOutlined sx={{ color: "black" }} /> */}
                  <Typography
                    color="black"
                    variant="h6"
                    sx={{ marginLeft: "10px" }}
                  >
                    Patient
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem
                color="black"
                onClick={() => {
                  handleSigninClose();
                  navigate("/signin-doctor");
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {/* <Doctor style={{ height: "20px", width: "20px", }} /> */}
                  <Typography
                    color="black"
                    variant="h6"
                    sx={{ marginLeft: "10px" }}
                  >
                    Doctor
                  </Typography>
                </Box>
              </MenuItem>
            </Menu>
          </Box>
          <Box
            onClick={handleSignupClick}
            sx={{
              ml: 2,
              borderRadius: "50px",
              padding: "5px 10px",
              backgroundColor: (theme) => theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Typography sx={{ color: "white" }} variant="body2">
              Sign Up
            </Typography>
            <KeyboardArrowRight sx={{ color: "white" }} />
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorElSignup}
            open={openSignup}
            sx={{ width: 200, zIndex: "9999", marginTop: "12px" }}
            onClose={handleSignupClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              color="black"
              // sx={{ width: "220px" }}
              onClick={() => {
                handleSignupClose();
                navigate("/signup");
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* <SettingsOutlined sx={{ color: "black" }} /> */}
                <Typography
                  color="black"
                  variant="h6"
                  sx={{ marginLeft: "10px" }}
                >
                  Patient
                </Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Box>
        <Fragment>
          <Button
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon
              sx={{
                color: "black",
                padding: "7px",
                borderRadius: "10px",
                border: "2px solid black",
              }}
            />
          </Button>
          <SwipeableDrawer
            sx={{ display: { xs: "block", md: "none" } }}
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            <Box sx={{ width: 250 }}>
              {/* <MenuBar /> */}
              <Box>
                <Box
                  sx={{
                    width: "90%",
                    margin: "auto",
                    paddingTop: "20px",
                    height: "100%",
                    marginTop: "96px",
                  }}
                >
                  <Box sx={{ width: "100%", fontSize: "20px" }}>
                    <List
                      component="nav"
                      aria-label="main mailbox folders"
                      onClick={toggleDrawer("left", false)}
                    >
                      {[
                        { link: "#", text: "Home", id: "home" },
                        { link: "#about", text: "About Us", id: "about" },
                        { link: "#contact", text: "Contact", id: "contact" },
                      ].map((item) => {
                        return (
                          <Box
                            sx={{
                              marginBottom: "20px",
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            <Link
                              style={{ textDecoration: "none" }}
                              to={item.link}
                              onClick={(e) => scrollToSection(e, item.id)}
                            >
                              <ListItemButton
                                sx={{
                                  marginBottom: "20px",
                                  borderRadius: "6px",
                                }}
                              >
                                <Typography
                                  color="text.primary"
                                  variant="caption"
                                  sx={{
                                    fontWeight: 500,
                                    fontSize: "30px",
                                    cursor: "pointer",
                                  }}
                                >
                                  {item.text}
                                </Typography>
                              </ListItemButton>
                            </Link>
                          </Box>
                        );
                      })}
                    </List>
                    <Divider />

                    <Box>
                      <Box
                        sx={{
                          borderRadius: "6px",
                          width: "80%",
                          margin: "auto",
                          marginTop: "20px",
                        }}
                      >
                        <Button
                          sx={{
                            width: "100%",
                            border: "1px solid",
                            borderRadius: "50px",
                          }}
                          startIcon={<Person />}
                          onClick={handleSigninClick}
                        >
                          <Typography variant="body1">Login</Typography>
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorElSignin}
                          open={openSignin}
                          sx={{ width: 200, zIndex: "9999", marginTop: "12px" }}
                          onClose={handleSigninClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem
                            color="black"
                            sx={{ width: "220px" }}
                            onClick={() => {
                              handleSigninClose();
                              navigate("/signin");
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {/* <SettingsOutlined sx={{ color: "black" }} /> */}
                              <Typography
                                color="black"
                                variant="h6"
                                sx={{ marginLeft: "10px" }}
                              >
                                Patient
                              </Typography>
                            </Box>
                          </MenuItem>
                          <MenuItem
                            color="black"
                            onClick={() => {
                              handleSigninClose();
                              navigate("/signin-doctor");
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {/* <Doctor style={{ height: "20px", width: "20px", }} /> */}
                              <Typography
                                color="black"
                                variant="h6"
                                sx={{ marginLeft: "10px" }}
                              >
                                Doctor
                              </Typography>
                            </Box>
                          </MenuItem>
                        </Menu>
                      </Box>
                      <Box
                        sx={{
                          boxSizing: "border-box",
                          borderRadius: "6px",
                          width: "80%",
                          margin: "auto",
                          marginTop: "20px",
                        }}
                      >
                        <Box
                          onClick={handleSignupClick}
                          sx={{
                            borderRadius: "50px",
                            padding: "5px 10px",
                            boxSizing: "border-box",
                            backgroundColor: (theme) =>
                              theme.palette.primary.main,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            width: "100%",
                          }}
                        >
                          <Typography sx={{ color: "white" }} variant="body1">
                            Sign Up
                          </Typography>
                          <KeyboardArrowRight sx={{ color: "white" }} />
                        </Box>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorElSignup}
                          open={openSignup}
                          sx={{ width: 200, zIndex: "9999", marginTop: "12px" }}
                          onClose={handleSignupClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem
                            color="black"
                            sx={{ width: "220px" }}
                            onClick={() => {
                              handleSignupClose();
                              navigate("/signup");
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {/* <SettingsOutlined sx={{ color: "black" }} /> */}
                              <Typography
                                color="black"
                                variant="h6"
                                sx={{ marginLeft: "10px" }}
                              >
                                Patient
                              </Typography>
                            </Box>
                          </MenuItem>
                        </Menu>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </SwipeableDrawer>
        </Fragment>
      </Box>
    </Box>
  );
};

export default Navbar;
