import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SettingsOutlined } from "@mui/icons-material";
import MyProfile from "../components/Settings/MyProfile";
import YourComponent from "../components/Settings/Password";

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

export default function Settings() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F1F3F9",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ width: "100%", backgroundColor: "#F1F3F9", pb: 4 }}>
        <Box
          sx={{
            pt: { xs: 5, md: 10 },
            pl: 10,
            pr: 10,
            pb: { xs: 5, md: 10 },
            display: "flex",
            alignItems: "center",
            border: "1px solid lightgray",
          }}
        >
          <SettingsOutlined fontSize="large" color="primary" />
          <Typography variant="h3" sx={{ color: "black", ml: "10px" }}>
            Settings
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: "90%", margin: "auto" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
                  My Profile
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
                  Password
                </Typography>
              }
              {...a11yProps(1)}
            />
            {/* <Tab label="Password" {...a11yProps(1)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <MyProfile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <YourComponent />
        </TabPanel>
      </Box>
    </Box>
  );
}
