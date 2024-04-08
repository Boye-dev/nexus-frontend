// const remCalc = (size, base = 16) => `${size / base}rem`;

// import { TypographyOptions } from "@mui/material/styles/createTypography";

// const typography: TypographyOptions = {
//   fontFamily:
//     'Ubuntu, Inter, Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue"',
// };

// export default typography;

// const remCalc = (size, base = 16) => `${size / base}rem`;

import { pxToRem } from "../utils/formatFont";

export function responsiveFontSizes({ xs, sm, md, lg, theme }) {
  return {
    [theme.breakpoints.up("xs")]: {
      fontSize: pxToRem(xs),
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: pxToRem(sm),
    },
    [theme.breakpoints.up("md")]: {
      fontSize: pxToRem(md),
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: pxToRem(lg),
    },
  };
}

const typography = {
  fontFamily: "'Poppins', sans-serif",
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    // fontSize: pxToRem(38),
    lineHeight: 48 / 38,
    fontWeight: 700,
  },
  h2: {
    // fontSize: pxToRem(30),
    fontWeight: 700,
  },
  h3: {
    // fontSize: pxToRem(24),
    lineHeight: 30 / 24,
    fontWeight: 700,
  },
  h4: {
    // fontSize: pxToRem(20),
    fontWeight: 700,
  },
  h5: {
    // fontSize: pxToRem(18),
    lineHeight: 22 / 18,
    fontWeight: 700,
  },
  h6: {
    // fontSize: pxToRem(14),
    fontWeight: 700,
  },
  subtitle1: {
    // fontSize: pxToRem(16),
    lineHeight: 28 / 16,
    fontWeight: 500,
  },
  subtitle2: {
    // fontSize: pxToRem(14),
    fontWeight: 500,
    lineHeight: 17 / 14,
  },
  body1: {
    // fontSize: pxToRem(16),
  },
  body2: {
    // fontSize: pxToRem(14),
    fontWeight: 400,
  },
  caption: {
    // fontSize: pxToRem(12),
  },
  overline: {
    // fontSize: pxToRem(12),
    textTransform: "uppercase",
    lineHeight: 12 / 12,
  },
  button: {
    // fontSize: pxToRem(14),
    textTransform: "capitalize",
  },
};

export default typography;
