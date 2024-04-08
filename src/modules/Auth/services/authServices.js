import Api from "../../../api/api";

export const login = async (payload) => {
  return Api.post("/patient/login/", payload).then((res) => res.data);
};
export const doctorLogin = async (payload) => {
  return Api.post("/doctor/login/", payload).then((res) => res.data);
};
export const signup = async (formData) => {
  return Api.post("/patient/signup/", formData).then((res) => res.data);
};
export const doctorSignup = async (formData) => {
  return Api.post("/doctor/signup/", formData).then((res) => res.data);
};
export const verifyPatient = async ({ queryKey }) => {
  const [, { patientId, uniqueString }] = queryKey;
  return Api.get(`/patient/verify/${patientId}/${uniqueString}`).then((res) => res.data);
};
export const verifyDoctor = async ({ queryKey }) => {
  const [, { doctorId, uniqueString }] = queryKey;
  return Api.get(`/doctor/verify/${doctorId}/${uniqueString}`).then((res) => res.data);
};
export const setPassword = async (payload) => {
  return Api.post("/personnels/create-password/", payload).then(
    (res) => res.data
  );
};
export const forgotPasswordPatient = async (payload) => {
  return Api.post("/patient/forgotPassword", payload).then(
    (res) => res.data
  );
};
export const resetPasswordPatient = async (payload) => {
  return Api.post("/patient/resetPassword", payload).then(
    (res) => res.data
  );
};
export const forgotPasswordDoctor = async (payload) => {
  return Api.post("/doctor/forgotPassword", payload).then(
    (res) => res.data
  );
};
export const resetPasswordDoctor = async (payload) => {
  return Api.post("/doctor/resetPassword", payload).then(
    (res) => res.data
  );
};
export const verifyToken = async (payload) => {
  return Api.post("/personnels/verify-token/", payload).then((res) => res.data);
};

export const forgotPassword = async (payload) => {
  return Api.post("/personnels/reset-password/", payload).then(
    (res) => res.data
  );
};
export const resetPassword = async (payload) => {
  return Api.post("/personnels/create-password/", payload).then(
    (res) => res.data
  );
};
