import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { SignupContextProvider } from "../../context/SignupContext";
import AuthHelper from "./components.js/AuthHelper";
import DoctorSignin from "./pages/DoctorSignin";
import DoctorAuthHelper from "./components.js/DoctorAuthHelper";
import VerifyPage from "./pages/VerifyPage";
import DoctorSignup from "./pages/DoctorSignup";
import ForgotPasswordPatient from "./pages/ForgotPasswordPatient";
import ForgotPasswordDoctor from "./pages/ForgotPasswordDoctor";
import FAQ from "../../pages/FAQ";

function Auth() {
  return (
    <SignupContextProvider>
      <Routes>
        <Route path="" element={<Navigate to="home" replace />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/faq" exact element={<FAQ />} />
        <Route path="/verify" exact element={<VerifyPage />} />
        <Route path="/forgot-password-patient" exact element={<ForgotPasswordPatient />} />
        <Route path="/forgot-password-doctor" exact element={<ForgotPasswordDoctor />} />
        <Route element={<AuthHelper />}>
          <Route path="/signin" exact element={<Signin />} />
        </Route>
        <Route element={<DoctorAuthHelper />}>
          <Route path="/signin-doctor" exact element={<DoctorSignin />} />
        </Route>
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/doctor-signup" exact element={<DoctorSignup />} />
      </Routes>
    </SignupContextProvider>
  );
}

export default Auth;
