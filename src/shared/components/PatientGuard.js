import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthPaths } from "../../routes/paths";
import React from "react";
import { isPatient } from "../../utils/auth";

const PatientGuard = ({ children }) => {
  const location = useLocation();

  if (isPatient()) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return (
      <Navigate to={AuthPaths.SIGNIN} state={{ from: location }} replace />
    );
  }
};

export default PatientGuard;
