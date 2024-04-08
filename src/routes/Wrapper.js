import { Routes, Route } from "react-router-dom";
import Auth from "../modules/Auth/AuthRouter";
import PatientRouter from "../modules/Patient/PatientRouter";
import MainLayout from "../shared/layouts/Main";
import PatientGuard from "../shared/components/PatientGuard";
import DoctorRouter from "../modules/Doctor/DoctorRouter";
import DoctorGuard from "../shared/components/DoctorGuard";
import VerifyPatientSuccess from "../modules/Auth/pages/VerifyPatientSuccess";
import VerifyDoctorSuccess from "../modules/Auth/pages/VerifyDoctorSuccess";
import ResetPasswordPatient from "../modules/Auth/pages/ResetPasswordPatient";
import ResetPasswordDoctor from "../modules/Auth/pages/ResetPasswordDoctor";

export const RoutesWrapper = () => {
  return (
    <Routes>
      <Route exact path="/*" element={<Auth />} />
      
      <Route path="/verify-patient/:patientId/:uniqueString" exact element={<VerifyPatientSuccess />} />
      <Route path="/verify-doctor/:doctorId/:uniqueString" exact element={<VerifyDoctorSuccess />} />
      <Route path="/resetPassword/patient/:patientId/:resetString" exact element={<ResetPasswordPatient />} />
      <Route path="/resetPassword/doctor/:doctorId/:resetString" exact element={<ResetPasswordDoctor />} />
      <Route element={<MainLayout />}>
        <Route element={<PatientGuard />}>
          <Route path="/patient/*" element={<PatientRouter />} />
        </Route>
        <Route element={<DoctorGuard />}>
          <Route path="/doctor/*" element={<DoctorRouter />} />
        </Route>
      </Route>
    </Routes>
  );
};
