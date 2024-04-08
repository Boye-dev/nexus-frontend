import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthPaths } from "../../routes/paths";
import React from "react";
import { isDoctor } from "../../utils/auth";

const DoctorGuard = ({ children }) => {
  const location = useLocation();

  if (isDoctor()) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return (
      <Navigate
        to={AuthPaths.DOCTOR_SIGNIN}
        state={{ from: location }}
        replace
      />
    );
  }
};

export default DoctorGuard;
