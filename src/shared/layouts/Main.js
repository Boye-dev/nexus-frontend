import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import PatientSidebar from "./Sidebars/PatientSidebar";
import { useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ReactComponent as Logo } from "../../assets/svgs/logo.svg";

export default function MainLayout({ children }) {
  const [collapse, setCollapse] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(220);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!mobile) {
      setDrawerWidth(220);
      setCollapse(false);
    }
  }, [mobile]);
  useEffect(() => {
    if (collapse) {
      setDrawerWidth(80);
    } else {
      setDrawerWidth(220);
    }
  }, [collapse]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "80px",
            backgroundColor: "white",
            position: "fixed",
            zIndex: "1200",
            top: 0,
            pl: 4,
            pr: 4,
          }}
        >
          <Box
            sx={{
              display: { xs: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",

              pl: 8,
              pr: 8,
            }}
          >
            <Logo />
            <Button
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={() => setOpen(!open)}
            >
              <MenuIcon
                sx={{
                  color: "black",
                  padding: "3px",
                  borderRadius: "10px",
                  border: "2px solid black",
                }}
              />
            </Button>
          </Box>
        </Box>

        <PatientSidebar
          width={drawerWidth}
          open={open}
          isMobile={!mobile}
          setOpen={setOpen}
          collapse={collapse}
        />
        {!mobile || (
          <Box
            onClick={() => setCollapse(!collapse)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: "1200",
              position: "fixed",
              top: 10,
              left: drawerWidth - 10,
              backgroundColor: "white",
              width: "25px",
              height: "25px",
              border: "0.5px solid #ED2228D6",
              borderRadius: "100%",
              boxShadow:
                "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)",
              cursor: "pointer",
            }}
          >
            {collapse ? (
              <ArrowForward color="primary" fontSize="5px" />
            ) : (
              <ArrowBack color="primary" fontSize="5px" />
            )}
          </Box>
        )}
        <Box sx={{ mt: !mobile && "80px", width: "100%" }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
