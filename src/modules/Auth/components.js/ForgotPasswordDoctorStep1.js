import { Box, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useSignupContext } from "../../../context/SignupContext";
import logo from "../../../assets/svgs/logosmall.svg";

const formStyles = {
//   marginBottom: "20px",
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

const ForgotPasswordDoctorStep1 = () => {
  const { forgotPasswordControlDoctor, forgotPasswordTriggerDoctor } = useSignupContext();

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
          color: "#252B33"
        }}
      >
        Fogot Password?
      </Typography>
      <form>
        <Typography
            sx={{
                textAlign: "left",
                marginTop: "10px",
                color: "black",
                marginBottom: "10px"
            }}
        >
            Enter the email address associated with your account.
        </Typography>

        <Controller
            name="email"
            control={forgotPasswordControlDoctor}
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
                forgotPasswordTriggerDoctor("email");
                }}
            />
              )}
        />
        </form>
    </Box>
  );
};

export default ForgotPasswordDoctorStep1;
