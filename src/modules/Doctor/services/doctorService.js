import Api from "../../../api/api";

export const fetchInfo = async ({ queryKey }) => {
  const [, { doctorId }] = queryKey;
  return Api.get(`/appointments/info/doctor/${doctorId}`).then(
    (res) => res.data
  );
};
export const fetchUpcoming = async ({ queryKey }) => {
  const [, { doctorId }] = queryKey;
  return Api.get(`/appointments/upcoming/doctor/${doctorId}`).then(
    (res) => res.data
  );
};
export const fetchAppointmentsDoctor = async ({ queryKey }) => {
  const [, { doctorId, limit, page, status }] = queryKey;
  return Api.get(
    `/appointments/doctor/${doctorId}?page=${page}${
      limit ? "&limit=" + limit : ""
    }${status ? "&status=" + status : ""}`
  ).then((res) => res.data);
};
export const fetchPastAppointmentsDoctor = async ({ queryKey }) => {
  const [, { doctorId }] = queryKey;
  return Api.get(`/past-appointments/doctor/${doctorId}`).then(
    (res) => res.data
  );
};
export const approveAppointment = async (payload) => {
  return Api.put(`/appointment/${payload.appointmentId}/approve`, payload).then(
    (res) => res.data
  );
};
export const declineAppointment = async (payload) => {
  return Api.put(`/appointment/${payload.appointmentId}/decline`).then(
    (res) => res.data
  );
};
export const fetchAnnouncementsDoctor = async ({ queryKey }) => {
  const [, { doctorId }] = queryKey;
  return Api.get(`/announcements/doctor/${doctorId}`).then((res) => res.data);
};
export const fetchNotifications = async ({ queryKey }) => {
  const [, { userId, status }] = queryKey;
  return Api.get(
    `/notifications/${userId}${status ? `?status=${status}` : ""}`
  ).then((res) => res.data);
};
export const markReadAll = async (payload) => {
  return Api.put(`/notifications/readAll/${payload.userId}`).then(
    (res) => res.data
  );
};
export const updateStatusToRead = async ({ queryKey }) => {
  const [, { doctorId, announcementId }] = queryKey;
  return Api.put(`/announcements/doctor/${announcementId}/${doctorId}`).then(
    (res) => res.data
  );
};

export const profileUpdate = async (formData) => {
  const _id = formData.get("_id");
  return Api.put(`/doctor/editProfile/${_id}`, formData).then(
    (res) => res.data
  );
};
export const passwordChange = async (payload) => {
  return Api.put(`/doctor/updatePassword/${payload.id}`, payload).then(
    (res) => res.data
  );
};

export const postAnnouncement = async (payload) => {
  return Api.post("/announcements", payload).then((res) => res.data);
};

export const book = async (payload) => {
  return Api.post("/appointment/book/", payload).then((res) => res.data);
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
export const readMessages = async (payload) => {
  return Api.put(
    `/chat/read/${payload.chatId}/${payload.userId}`,
    payload
  ).then((res) => res.data);
};
