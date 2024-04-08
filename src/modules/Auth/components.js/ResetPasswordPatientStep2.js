import React from "react";
// import { CircularProgress } from "@mui/material";
import logo from "../../../assets/svgs/logosmall.svg";
import check from "../../../assets/images/Check.png";
import {  Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const ResetPasswordPatientStep2 = (props) => {
    const navigate = useNavigate();

    
    const onSubmit = () => {
        navigate("/signin")
    };

    useEffect(() => {
        
        window.scrollTo(0, 0);
    }, []);
  
    return (
        <Box>
            <img src={logo} alt="" />

            <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{
                marginBottom: "12px",
                fontWeight: 700,
                fontSize: "28px !important",
            }}
            >
            Sign in to <span style={{ color: "#CE1E23" }}> NEXUS</span>
            </Typography>
            
            <img src={check} alt="" />

            <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{
                marginBottom: "12px",
                fontWeight: 500,
                fontSize: "18px !important",
            }}
            >
                {props.message}
            </Typography>



            <LoadingButton
                fullWidth
                size="small"
                onClick={onSubmit}
                loadingPosition="end"
                variant="contained"
                sx={{
                fontSize: "18px !important",
                background: "#252B33",
                padding: "6px",
                marginBottom: "6px",
                color: "#fff",
                "&:hover": {
                    backgroundColor: "#252B33",
                },
                }}
            >
                Proceed To Login
            </LoadingButton>

        </Box>
    );
};

export default ResetPasswordPatientStep2;


