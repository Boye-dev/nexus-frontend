import { CloudUploadOutlined, Person } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { getDecodedJwt } from "../../../../utils/auth";
import { useAlert } from "../../../../context/NotificationProvider";
import { useQueryClient } from "react-query";
import { profileUpdate } from "../../services/doctorService";
import { useAuthenticatedUserDoctor } from "../../../../hooks/useAuthenticatedUserDoctor";

const formStyles = {
  marginBottom: {xs: "20px", md: 0},
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
    background: "#F1F3F9",
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

const MyProfile = () => {
  const { isLoading, userDetails } = useAuthenticatedUserDoctor();
  const doctorId = getDecodedJwt().id;
  const { showNotification } = useAlert();
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    firstName: yup.string().required("First name Is Required"),
    lastName: yup.string().required("Last name Is Required"),
    email: yup.string().required("Email Is Required"),
    profilePicture: yup
      .mixed()
      .nullable()
      .required("Profile picture is required"),
    role: yup.string().required("Role is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    address: yup.string().required("Address is required"),
    specialty: yup.string().required("Specialty is required"),
  });

  const { handleSubmit, trigger, control, setValue, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedPicture, setSelectedPicture] = useState("");
  // const {lastName, firstName, email, profilePicture, role, phoneNumber, address, emergencyContactName, emergencyContactAddress, emergencyContactNumber} = watch()
  const handlePictureClick = async () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";

    await inputElement.click();

    inputElement.onchange = (event) => {
      const file = event.target.files[0];

      setSelectedPicture(URL.createObjectURL(file));

      setValue("profilePicture", file);
    };
  };

  useEffect(() => {
    if (userDetails?.data.profilePicture) {
      setSelectedPicture(userDetails.data.profilePicture);

      setValue("profilePicture", userDetails.data.profilePicture);
    }

    window.scrollTo(0, 0);
  }, [setValue, userDetails]);

  const { mutate, isLoading: submitLoading } = useMutation(profileUpdate, {
    onError: (error) => {
      if (error.response && (error.response.status === 500 || error.response.status === 400)) {
        // Handle the 500 error here
        showNotification?.(error.response.data.message || "Internal Server Error" , {
          type: "error",
        });
      } else {
        // Handle other errors
        console.log(error);
        showNotification?.(
          error.response.data.errors[0] || error.response.data.message ||
            error.message ||
            error.error ||
            "An error occurred",
          {
            type: "error",
          }
        );
      }
    },
    onSuccess: (data) => {
      showNotification?.(data.message, { type: "success" });
      queryClient.refetchQueries("doctor_by_id");
    },
  });
  const onSubmit = (payload) => {
    const formData = new FormData();
    formData.append("profilePicture", payload.profilePicture);
    formData.append("lastName", payload.lastName);
    formData.append("firstName", payload.firstName);
    formData.append("specialty", payload.specialty);
    formData.append("phoneNumber", payload.phoneNumber);
    formData.append("address", payload.address);
    formData.append("_id", doctorId);
    mutate(formData);
  };

  return (
    <>
      {isLoading || submitLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: "#F1F3F9",
            width: "100%",
            // height: "100vh",
          }}
        >
          <Box sx={{ width: "100%", backgroundColor: "#F1F3F9", pb: 4 }}>
            <Box
              sx={{
                pt: 3,
                pb: 3,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ color: "black" }}>
                  Personal Info
                </Typography>
                <Typography variant="caption" sx={{ color: "lightgray" }}>
                  You can edit your personal details and profile here.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  // justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  // onClick={props.onClose}
                  variant="text"
                  color="error"
                  sx={{
                    padding: "0 10px",
                    // width: "40%",
                    height: "35px",
                    border: "1px solid lightgray",
                    mr: 2,
                  }}
                  onClick={handleSubmit(onSubmit)}
                >
                  <Typography variant="subtitle2">Save</Typography>
                </Button>
                <LoadingButton
                  // loading={isLoading}
                  variant="contained"
                  color="secondary"
                  onClick={() => reset()}
                  sx={{
                    padding: "0 10px",
                    // width: "40%",
                    height: "35px",
                    backgroundColor: "#ED2228",
                  }}
                >
                  <Typography variant="subtitle2" color="white">
                    Cancel
                  </Typography>
                </LoadingButton>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                pt: 6,
                pb: 6,
              }}
            >
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={12}
                  md={5}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    variant="h6"
                    color="black"
                    sx={{ alignSelf: "start", mb: 3 }}
                  >
                    Name
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Controller
                        name="lastName"
                        control={control}
                        defaultValue={userDetails?.data.lastName || ""}
                        sx={{ display: "flex", alignItems: "center" }}
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
                              trigger("lastName");
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Controller
                        name="firstName"
                        control={control}
                        defaultValue={userDetails?.data.firstName || ""}
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
                              trigger("firstName");
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box
              sx={{
                pt: 6,
                pb: 6,
              }}
            >
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={12}
                  md={5}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    variant="h6"
                    color="black"
                    sx={{ alignSelf: "start", mb: 3 }}
                  >
                    Email
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={userDetails?.data.email || ""}
                    sx={{ display: "flex", alignItems: "center" }}
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
                        disabled
                        fullWidth
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                        onKeyUp={() => {
                          trigger("email");
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box
              sx={{
                pt: 6,
                pb: 6,
              }}
            >
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={12}
                  md={5}
                  sx={{ display: "flex", alignItems: "center", mb: 5 }}
                >
                  <Box sx={{ alignSelf: "start" }}>
                    <Typography variant="h6" sx={{ color: "black" }}>
                      Your Photo
                    </Typography>
                    <Typography variant="caption" sx={{ color: "lightgray" }}>
                      This photo will be displayed on your profile.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Grid container spacing={2}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      width={100}
                      height={100}
                      borderRadius="50%"
                      bgcolor="#F5F5F6"
                      sx={{
                        border: "1px solid lightgray",
                        borderRadius: "50%",
                        marginRight: "12px",
                      }}
                    >
                      {/* {
                                            selectedPicture ? (
                                            <img src={userDetails?.data.profilePicture || selectedPicture} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: "50%", objectFit: 'cover' }} />
                                        ) : (
                                            <Box >
                                                <Person bgcolor="#F1F3F9" style={{fontSize:'70px', color: "black", background: "#F1F3F9", padding: "6px", boder: "10px solid #F1F3F9", borderRadius: "50%"}}/>
                                            </Box>
                                        )} */}
                      {selectedPicture ? (
                        <img
                          src={selectedPicture}
                          alt="Profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <Box>
                          <Person
                            bgcolor="#F1F3F9"
                            style={{
                              fontSize: "70px",
                              color: "black",
                              background: "#F1F3F9",
                              padding: "6px",
                              border: "10px solid #F1F3F9",
                              borderRadius: "50%",
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                    <Box
                      onClick={handlePictureClick}
                      style={{
                        // ml: "12px",
                        width: "70%",
                        height: "150px",
                        borderRadius: "5px",
                        float: "right",
                        background: "#F5F5F6",
                        border: "1px solid lightgray",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        cursor: "pointer",
                      }}
                    >
                      <Box>
                        <CloudUploadOutlined
                          fontSize="large"
                          sx={{ width: "100%", mb: "0" }}
                        />

                        <Typography
                          variant="h5"
                          sx={{
                            color: "black",
                            textAlign: "center",
                            width: "100%",
                          }}
                        >
                          Click to upload
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "lightgray" }}
                        >
                          PNG or JPG (max. 800x400px)
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box
              sx={{
                pt: 6,
                pb: 6,
              }}
            >
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={12}
                  md={5}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    variant="h6"
                    color="black"
                    sx={{ alignSelf: "start", mb: 3 }}
                  >
                    Specialty
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Controller
                    name="specialty"
                    control={control}
                    defaultValue={userDetails?.data.specialty}
                    sx={{ display: "flex", alignItems: "center" }}
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
                        label="Specialty"
                        fullWidth
                        disabled
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                        onKeyUp={() => {
                          trigger("specialty");
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box
              sx={{
                pt: 6,
                pb: 6,
              }}
            >
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={12}
                  md={5}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    variant="h6"
                    color="black"
                    sx={{ alignSelf: "start", mb: 3 }}
                  >
                    Role
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Controller
                    name="role"
                    control={control}
                    defaultValue={userDetails?.data.role}
                    sx={{ display: "flex", alignItems: "center" }}
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
                        label="Role"
                        fullWidth
                        disabled
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                        onKeyUp={() => {
                          trigger("role");
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box
              sx={{
                pt: 6,
                pb: 6,
              }}
            >
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={12}
                  md={5}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    variant="h6"
                    color="black"
                    sx={{ alignSelf: "start", mb: 3 }}
                  >
                    Contact Details
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue={userDetails?.data.phoneNumber}
                        sx={{ display: "flex", alignItems: "center" }}
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
                    <Grid item xs={12} md={6}>
                      <Controller
                        name="address"
                        control={control}
                        defaultValue={userDetails?.data.address}
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
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Divider />
          </Box>
        </Box>
      )}
    </>
  );
};

export default MyProfile;
