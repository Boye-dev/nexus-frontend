
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { Person } from '@mui/icons-material';
import { Badge, Checkbox, FormControlLabel, Typography, } from '@mui/material';
import { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useSignupContext} from '../../../context/SignupContext';
import { Controller } from 'react-hook-form';
import { useAlert } from '../../../context/NotificationProvider';


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


const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "not-specified", label: "Prefer Not to Say" },
];

const specialtyOptions = [
    { value: "Dentistry", label: "Dentistry" },
    { value: "Opthamology", label: "Opthamology" },
    // { value: "married", label: "Married" },
    // { value: "divorced", label: "Divorced" },
    // { value: "widowed", label: "Widowed" },
];

const DoctorSignupStep2 = () => {
    
    const { doctorControl, doctorTrigger, doctorWatch, doctorSetValue, doctorErrors } = useSignupContext();

    const { profilePicture, } = doctorWatch()

    const [selectedPicture, setSelectedPicture] = useState(profilePicture);
    const { showNotification } = useAlert();


    const handlePictureClick = async () => {
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
      
        await inputElement.click();
      
        inputElement.onchange = (event) => {
            const file = event.target.files[0];
        
            if (file && file.size <= 10485760) {
                setSelectedPicture(file);
                doctorSetValue('profilePicture', file);
            } else {
                // Display an error message or handle the case where the file is too large
                showNotification?.("File is too large. Please select a file smaller than 10 MB.");
                // console.log('File is too large. Please select a file smaller than 10 MB.');
            }
        };
    };

    return (
        <Box>
            <form >
                <Box display="flex" justifyContent="center" mb={3}>
                    {/* Profile picture selection */}
                    <Box textAlign="center" mb={3}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width={150}
                            height={150}
                            borderRadius="50%"
                            bgcolor="#F5F5F6"
                        >
                            <Badge
                                badgeContent={<AddPhotoAlternateIcon />}
                                onClick={handlePictureClick}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                sx={{
                                    position: 'relative',
                                    '& .MuiBadge-badge': {
                                    backgroundColor: '#fff',
                                    color: '#000',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    padding: '2px',
                                    boxShadow: '0 0 0 3px #fff',
                                    cursor: 'pointer',
                                    },
                                }}
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    width={120}
                                    height={120}
                                    borderRadius="50%"
                                    bgcolor="#FFFFFF"
                                >
                                    {selectedPicture ? (
                                        <img src={URL.createObjectURL(selectedPicture)} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: "50%", objectFit: 'cover' }} />
                                    ) : (
                                        <Person bgcolor="#F5F5F6" style={{fontSize:'90px', background: "#F5F5F6", padding: "6px", boder: "10px solid #fff", borderRadius: "50%"}}/>
                                    )}
                                </Box>
                            </Badge>
                        </Box>
                        {profilePicture === "" && (
                            <Typography variant='caption' sx={{ color: "red", mb: 3 }}>
                                Please select a profile photo
                            </Typography>
                        )}
                    </Box>
                </Box>


                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                    <Controller
                        name="gender"
                        control={doctorControl}
                        defaultValue=""
                        render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                        <TextField
                            variant="outlined"
                            size="small"
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
                            sx={formStyles}
                            label="Gender"
                            select
                            fullWidth
                            {...fields}
                            inputRef={ref}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                            onKeyUp={() => {
                                doctorTrigger("gender");
                            }}
                        >
                            {genderOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>
                        )}
                    />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="specialty"
                            control={doctorControl}
                            defaultValue=""
                            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                            <TextField
                                variant="outlined"
                                size="small"
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
                                sx={formStyles}
                                label="Specialty"
                                select
                                fullWidth
                                {...fields}
                                inputRef={ref}
                                error={Boolean(error?.message)}
                                helperText={error?.message}
                                onKeyUp={() => {
                                    doctorTrigger("specialty");
                                    }}
                            >
                                {specialtyOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="phoneNumber"
                            control={doctorControl}
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
                                    doctorTrigger("phoneNumber");
                                }}
                            />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Controller
                        name="address"
                        control={doctorControl}
                        defaultValue=""
                        render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                        <TextField
                            variant="outlined"
                            size="small"
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
                            sx={formStyles}
                            label="Address"
                            fullWidth
                            {...fields}
                            inputRef={ref}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                            onKeyUp={() => {
                                doctorTrigger("address");
                            }}
                        />
                        )}
                    />
                    </Grid>
                </Grid>
                <Grid item xs={12} display="flex">
                    <Box>
                        <Controller
                            name="agreeToTerms"
                            control={doctorControl}
                            defaultValue={false}
                            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                            <FormControlLabel
                                control={
                                <Checkbox
                                    onClick={() => doctorTrigger("agreeToTerms")}
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
                        {doctorErrors.agreeToTerms && (
                            <Typography variant='caption' sx={{  mb: 3, color: "red !important", display: "flex"}}>
                                Please accept the terms and conditions.
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </form>
        </Box>
    );
};

export default DoctorSignupStep2;
