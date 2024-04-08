import { TextField, Checkbox, FormControlLabel, Grid, Box, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useSignupContext } from '../../../context/SignupContext';


const formStyles = {
    marginBottom: "20px",
    color: "black !important",
    background: "#F5F5F6",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
      outline: "none",
      borderRadius: "3px",
      color: "#000",
      textAlign:"left"
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

const SignupStep3 = () => {
    
    const { control, trigger, errors } = useSignupContext()

    return (
        <Box>
            
            <form>
            <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue=""
                    render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={formStyles}
                        InputProps={{
                        style: {
                            fontSize: '16px',
                            color: "#000 !important",
                        },
                        }}
                        InputLabelProps={{
                        style: {
                            color: "black",
                        },
                        }}
                        label="Phone Number"
                        fullWidth
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                        onKeyUp={() => {
                            trigger("phoneNumber");
                        }}
                    />
                    )}
                />
                </Grid>
                <Grid item xs={12} md={7}>
                <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={formStyles}
                        InputProps={{
                        style: {
                            fontSize: '16px',
                            color: "#000 !important",
                        },
                        }}
                        InputLabelProps={{
                        style: {
                            color: "black",
                        },
                        }}
                        label="Address"
                        fullWidth
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                        onKeyUp={() => {
                            trigger("address");
                        }}
                    />
                    )}
                />
                </Grid>
                <Grid item xs={12} md={7}>
                <Controller
                    name="emergencyContactName"
                    control={control}
                    defaultValue=""
                    render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={formStyles}
                        InputProps={{
                        style: {
                            fontSize: '16px',
                            color: "#000 !important",
                        },
                        }}
                        InputLabelProps={{
                        style: {
                            color: "black",
                        },
                        }}
                        label="Emergency Contact Full Name"
                        fullWidth
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                        onKeyUp={() => {
                            trigger("emergencyContactName");
                        }}
                    />
                    )}
                />
                </Grid>
                <Grid item xs={12} md={5}>
                <Controller
                    name="emergencyContactNumber"
                    control={control}
                    defaultValue=""
                    render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={formStyles}
                        InputProps={{
                        style: {
                            fontSize: '16px',
                            color: "#000 !important",
                        },
                        }}
                        InputLabelProps={{
                        style: {
                            color: "black",
                        },
                        }}
                        label="Emergency Contact Phone Number"
                        fullWidth
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                        onKeyUp={() => {
                            trigger("emergencyContactNumber");
                        }}
                    />
                    )}
                />
                </Grid>
                <Grid item xs={12}>
                <Controller
                    name="emergencyContactAddress"
                    control={control}
                    defaultValue=""
                    render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={formStyles}
                        InputProps={{
                        style: {
                            fontSize: '16px',
                            color: "#000 !important",
                        },
                        }}
                        InputLabelProps={{
                        style: {
                            color: "black",
                        },
                        }}
                        label="Emergency Contact Address"
                        fullWidth
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                        onKeyUp={() => {
                            trigger("emergencyContactAddress");
                        }}
                    />
                    )}
                />
                </Grid>
                <Grid item xs={12} display="flex">
                    <Box>
                        <Controller
                            name="agreeToTerms"
                            control={control}
                            defaultValue={false}
                            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                            <FormControlLabel
                                control={
                                <Checkbox
                                    onClick={() => trigger("agreeToTerms")}
                                    {...fields}
                                    inputRef={ref}
                                    color="primary"
                                />
                                }
                                label= <Typography  sx={{ color: "black !important", }}>
                                I agree to the Terms and Conditions
                            </Typography>
                            />
                            )}
                        />
                        {errors.agreeToTerms && (
                            <Typography variant='caption' sx={{  mb: 3, color: "red !important", display: "flex"}}>
                                Please accept the terms and conditions.
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
            </form>
            
        </Box>
    );
};


export default SignupStep3;