import { Navigate, Outlet } from "react-router-dom";
import React from "react";

import { Roles } from "../../../constants/roles";
import { DoctorPaths } from "../../../routes/paths";
import { getDecodedJwt } from "../../../utils/auth";

const DoctorAuthHelper = () => {
  const decodedUser = getDecodedJwt();
  if (decodedUser.role === Roles.DOCTOR) {
    return <Navigate to={DoctorPaths.DOCTOR_DASHBOARD} replace />;
  } else {
    return (
      <>
        <Outlet />
      </>
    );
  }
};

export default DoctorAuthHelper;
