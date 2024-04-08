// import { Box, IconButton, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useSignupContext } from "../../../context/SignupContext";
import { TextField } from "@mui/material";
import logo from "../../../assets/svgs/logosmall.svg";
import { Typography, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const formStyles = {
  marginBottom: "20px",
  color: "black !important",
  background: "#F5F5F6",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    outline: "none",
    borderRadius: "3px",
    color: "#000",
  },
  "& .MuiInputBase-input:hover": {
    border: "0",
    outline: "none",
    borderRadius: "5px",
    color: "#000",
  },
  "& .MuiFormHelperText-root": {
    color: "red !important",
    background: "#fff",
    width: "100%",
    margin: 0,
  },
  "& .Mui-active": {
    outline: "none",
    borderRadius: "5px",
  },
  "& .Mui-focused": {
    color: "#000",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
};

const ResetPasswordPatientStep1 = () => {
  const { resetPasswordControl, resetPasswordTrigger } = useSignupContext();
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleChange = (e) => {
    e.preventDefault();
  };
  const handleClickShowPassword2 = () => {
    setValues({
      ...values,
      showPassword2: !values.showPassword2,
    });
  };

  const [values, setValues] = useState({
    vertical: "bottom",
    horizontal: "center",
    open: false,
    showPassword: false,
    showPassword2: false,
  });

  return (
    <Box>
      <img src={logo} alt="" />
      <Typography
        variant="h6"
        color="inherit"
        component="div"
        sx={{
          marginBottom: "30px",
          fontWeight: 700,
          fontSize: "28px !important",
          color: "#252B33",
        }}
      >
        Set New Password
      </Typography>
      <form>
        <Controller
          name="newPassword"
          control={resetPasswordControl}
          defaultValue=""
          render={({ field: { ref, ...fields }, fieldState: { error } }) => (
            <TextField
              variant="outlined"
              sx={formStyles}
              label="New Password"
              fullWidth
              size="small"
              {...fields}
              type={values.showPassword ? "text" : "password"}
              InputLabelProps={{
                style: {
                  color: "black",
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword}>
                    {values.showPassword === true ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                ),
                style: {
                  fontSize: "16px",
                },
              }}
              inputRef={ref}
              error={Boolean(error?.message)}
              helperText={error?.message}
              onKeyUp={() => {
                resetPasswordTrigger("newPassword");
              }}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={resetPasswordControl}
          defaultValue=""
          render={({ field: { ref, ...fields }, fieldState: { error } }) => (
            <TextField
              onCut={handleChange}
              onCopy={handleChange}
              onPaste={handleChange}
              variant="outlined"
              sx={formStyles}
              label="Confirm Password"
              fullWidth
              size="small"
              {...fields}
              type={values.showPassword2 ? "text" : "password"}
              InputLabelProps={{
                style: {
                  color: "black",
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword2}>
                    {values.showPassword2 === true ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                ),
                style: {
                  fontSize: "16px",
                },
              }}
              inputRef={ref}
              error={Boolean(error?.message)}
              helperText={error?.message}
              onKeyUp={() => {
                resetPasswordTrigger("confirmPassword");
              }}
            />
          )}
        />
      </form>
      {/* <Typography
                sx={{
                textAlign: "left",
                marginTop: "10px",
                color: "black",
                }}
            >
                Return to{" "}
                <Link
                style={{ decoration: "none", color: "#CE1E23" }}
                to={"/signin"}
                >
                Sign in
                </Link>
            </Typography> */}
    </Box>
  );
};

export default ResetPasswordPatientStep1;
