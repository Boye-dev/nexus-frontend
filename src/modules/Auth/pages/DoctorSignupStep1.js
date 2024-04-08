import { Box, IconButton, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useSignupContext } from "../../../context/SignupContext";
import logo from "../../../assets/svgs/logosmall.svg";

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

const DoctorSignupStep1 = () => {
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
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
  const handleChange = (e) => {
    e.preventDefault();
  };
  const { doctorControl, doctorTrigger } = useSignupContext();

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
        }}
      >
        Sign up to <span style={{ color: "#CE1E23" }}> NEXUS</span> as Doctor
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Controller
              name="firstName"
              control={doctorControl}
              defaultValue=""
              render={({
                field: { ref, ...fields },
                fieldState: { error },
              }) => (
                <TextField
                  variant="outlined"
                  size="small"
                  InputProps={{
                    style: {
                      fontSize: "16px",
                      color: "#000 !important",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "black",
                    },
                  }}
                  sx={formStyles}
                  label="First Name"
                  fullWidth
                  {...fields}
                  inputRef={ref}
                  error={Boolean(error?.message)}
                  helperText={error?.message}
                  onKeyUp={() => {
                    doctorTrigger("firstName");
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="lastName"
              control={doctorControl}
              defaultValue=""
              render={({
                field: { ref, ...fields },
                fieldState: { error },
              }) => (
                <TextField
                  variant="outlined"
                  size="small"
                  InputProps={{
                    style: {
                      fontSize: "16px",
                      color: "#000 !important",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "black",
                    },
                  }}
                  sx={formStyles}
                  label="Last Name"
                  fullWidth
                  {...fields}
                  inputRef={ref}
                  error={Boolean(error?.message)}
                  helperText={error?.message}
                  onKeyUp={() => {
                    doctorTrigger("lastName");
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={doctorControl}
              defaultValue=""
              render={({
                field: { ref, ...fields },
                fieldState: { error },
              }) => (
                <TextField
                  variant="outlined"
                  size="small"
                  InputProps={{
                    style: {
                      fontSize: "16px",
                      color: "#000 !important",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "black",
                    },
                  }}
                  sx={formStyles}
                  label="Email"
                  fullWidth
                  {...fields}
                  inputRef={ref}
                  error={Boolean(error?.message)}
                  helperText={error?.message}
                  onKeyUp={() => {
                    doctorTrigger("email");
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={doctorControl}
              defaultValue=""
              render={({
                field: { ref, ...fields },
                fieldState: { error },
              }) => (
                <TextField
                  variant="outlined"
                  size="small"
                  onCut={handleChange}
                  onCopy={handleChange}
                  onPaste={handleChange}
                  type={values.showPassword ? "text" : "password"}
                  InputProps={{
                    style: {
                      fontSize: "16px",
                      color: "#000 !important",
                    },
                    endAdornment: (
                      <IconButton onClick={handleClickShowPassword}>
                        {values.showPassword === true ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    ),
                  }}
                  InputLabelProps={{
                    style: {
                      color: "black",
                    },
                  }}
                  sx={formStyles}
                  label="Password"
                  fullWidth
                  {...fields}
                  inputRef={ref}
                  error={Boolean(error?.message)}
                  helperText={error?.message}
                  onKeyUp={() => {
                    doctorTrigger("password");
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="confirmPassword"
              control={doctorControl}
              defaultValue=""
              render={({
                field: { ref, ...fields },
                fieldState: { error },
              }) => (
                <TextField
                  variant="outlined"
                  size="small"
                  onCut={handleChange}
                  onCopy={handleChange}
                  onPaste={handleChange}
                  type={values.showPassword2 ? "text" : "password"}
                  InputProps={{
                    style: {
                      fontSize: "16px",
                      color: "#000 !important",
                    },
                    endAdornment: (
                      <IconButton onClick={handleClickShowPassword2}>
                        {values.showPassword2 === true ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    ),
                  }}
                  InputLabelProps={{
                    style: {
                      color: "black",
                    },
                  }}
                  sx={formStyles}
                  label="Confirm Password"
                  fullWidth
                  {...fields}
                  inputRef={ref}
                  error={Boolean(error?.message)}
                  helperText={error?.message}
                  onKeyUp={() => {
                    doctorTrigger("confirmPassword");
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default DoctorSignupStep1;
