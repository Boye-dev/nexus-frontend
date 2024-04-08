import { createTheme } from "@mui/material/styles";
// import Card from './overrides/Card';
// import Input from './overrides/Input';
import palette from "./palette";
import typography, { responsiveFontSizes } from "./typography";

// NB: This is only extending/customizing the material ui theme
// refer to https://material-ui.com/customization/default-theme/ to see the default theme/props

let themeInstance = createTheme({});

themeInstance = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "capitalize",
        },
        outlinedPrimary: {
          border: "0px",
          color: "#0050C8",
          background: "#F0F5FF",
          "&:hover": {
            border: "none",
            background: "rgba(0,80,200, 0.4)",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: "white", // Set the desired background color
        },
        option: {
          '&[aria-selected="true"]': {
            backgroundColor: "grey", // Set the desired background color
          },
          color: "black",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "black", // Set the label text color
        },
        outlined: {
          "&.Mui-focused": {
            color: "black", // Set the label text color when focused
          },
        },
      },
    },
  },

  palette,
  typography,
  spacing: (factor) => `${0.25 * factor}rem`,
});

themeInstance.typography.h1 = {
  ...themeInstance.typography.h1,
  ...responsiveFontSizes({
    lg: 38,
    md: 34,
    sm: 30,
    xs: 26,
    theme: themeInstance,
  }),
  color: themeInstance.palette.text.primary,
};

themeInstance.typography.h2 = {
  ...themeInstance.typography.h2,
  ...responsiveFontSizes({
    lg: 30,
    md: 26,
    sm: 22,
    xs: 20,
    theme: themeInstance,
  }),
  color: themeInstance.palette.text.primary,
};

themeInstance.typography.h3 = {
  ...themeInstance.typography.h3,
  ...responsiveFontSizes({
    lg: 23,
    md: 21,
    sm: 19,
    xs: 17,
    theme: themeInstance,
  }),
  color: themeInstance.palette.text.primary,
};

themeInstance.typography.h4 = {
  ...themeInstance.typography.h4,
  ...responsiveFontSizes({
    lg: 20,
    md: 18,
    sm: 16,
    xs: 14,
    theme: themeInstance,
  }),
  color: themeInstance.palette.text.primary,
};

themeInstance.typography.h5 = {
  ...themeInstance.typography.h5,
  ...responsiveFontSizes({
    lg: 18,
    md: 16,
    sm: 14,
    xs: 12,
    theme: themeInstance,
  }),
  color: themeInstance.palette.text.primary,
};

themeInstance.typography.h6 = {
  ...themeInstance.typography.h6,
  ...responsiveFontSizes({
    lg: 14,
    md: 12,
    sm: 10,
    xs: 10,
    theme: themeInstance,
  }),
  color: themeInstance.palette.text.primary,
};

themeInstance.typography.subtitle1 = {
  ...themeInstance.typography.subtitle1,
  ...responsiveFontSizes({
    lg: 16,
    md: 14,
    sm: 12,
    xs: 10,
    theme: themeInstance,
  }),
  color: themeInstance.palette.text.primary,
};

themeInstance.typography.subtitle2 = {
  ...themeInstance.typography.subtitle2,
  ...responsiveFontSizes({
    lg: 14,
    md: 13,
    sm: 12,
    xs: 10,
    theme: themeInstance,
  }),
  color: themeInstance.palette.text.primary,
};

themeInstance.typography.body1 = {
  ...themeInstance.typography.body1,
  ...responsiveFontSizes({
    lg: 16,
    md: 14,
    sm: 12,
    xs: 10,
    theme: themeInstance,
  }),
  color: themeInstance.palette.text.primary,
};

themeInstance.typography.body2 = {
  ...themeInstance.typography.body2,
  ...responsiveFontSizes({
    lg: 14,
    md: 13,
    sm: 12,
    xs: 10,
    theme: themeInstance,
  }),
  color: themeInstance.palette.text.primary,
};

themeInstance.typography.caption = {
  ...themeInstance.typography.caption,
  ...responsiveFontSizes({
    lg: 12,
    md: 12,
    sm: 12,
    xs: 11,
    theme: themeInstance,
  }),
  color: themeInstance.palette.text.primary,
};

themeInstance.typography.overline = {
  ...themeInstance.typography.overline,
  ...responsiveFontSizes({
    lg: 12,
    md: 11,
    sm: 10,
    xs: 10,
    theme: themeInstance,
  }),
  color: themeInstance.palette.text.primary,
};

themeInstance.typography.button = {
  ...themeInstance.typography.button,
  ...responsiveFontSizes({
    lg: 12,
    md: 11,
    sm: 10,
    xs: 8,
    theme: themeInstance,
  }),
  color: themeInstance.palette.text.primary,
  cursor: "pointer",
};

const theme = { ...themeInstance };

export default theme;
