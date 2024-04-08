import Api from "../../../api/api";

export const fetchInfo = async ({ queryKey }) => {
  const [, { patientId }] = queryKey;

  return Api.get(`/appointments/info/${patientId}`).then((res) => res.data);
};
export const fetchUpcoming = async ({ queryKey }) => {
  const [, { patientId }] = queryKey;
  return Api.get(`/appointments/upcoming/${patientId}`).then((res) => res.data);
};

export const fetchAppointments = async ({ queryKey }) => {
  const [, { patientId, limit, page, status }] = queryKey;
  return Api.get(
    `/appointments/${patientId}?page=${page}${limit ? "&limit=" + limit : ""}${
      status ? "&status=" + status : ""
    }`
  ).then((res) => res.data);
};
export const fetchAnnouncements = async ({ queryKey }) => {
  const [, { patientId }] = queryKey;
  return Api.get(`/announcements/patient/${patientId}`).then((res) => res.data);
};
export const updateStatusToRead = async ({ queryKey }) => {
  const [, { patientId, announcementId }] = queryKey;
  return Api.put(`/announcements/patient/${announcementId}/${patientId}`).then(
    (res) => res.data
  );
};

export const profileUpdate = async (formData) => {
  const _id = formData.get("_id");
  return Api.put(`/patient/editProfile/${_id}`, formData).then(
    (res) => res.data
  );
};

export const passwordChange = async (payload) => {
  return Api.put(`/patient/updatePassword/${payload.id}`, payload).then(
    (res) => res.data
  );
};
export const fetchPastAppointmentsDoctor = async ({ queryKey }) => {
  const [, { patientId }] = queryKey;
  return Api.get(`/past-appointments/patient/${patientId}`).then(
    (res) => res.data
  );
};
export const book = async (payload) => {
  try {
    return Api.post("/appointment/book/", payload).then((res) => res.data);
  } catch (error) {
    return error;
  }
};
export const cancel = async (payload) => {
  return Api.put(
    `/appointment/cancel/${payload.appointmentId}/${payload.userId}`,
    payload
  ).then((res) => res.data);
};
export const reschedule = async (payload) => {
  return Api.put(
    `/appointment/reschedule/${payload.appointmentId}`,
    payload
  ).then((res) => res.data);
};
export const fetchChats = async ({ queryKey }) => {
  const [, { userId }] = queryKey;
  return Api.get(`/chats/${userId}`).then((res) => res.data);
};
export const fetchMessages = async ({ queryKey }) => {
  const [, { chatId }] = queryKey;
  return Api.get(`/messages/${chatId}`).then((res) => res.data);
};
export const postMessages = async (payload) => {
  return Api.post(`/message/${payload.userId}`, payload).then(
    (res) => res.data
  );
};
