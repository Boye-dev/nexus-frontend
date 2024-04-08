import Api from "../api/api";


export const subscribe = async (payload) => {
  return Api.post("/newsletter-subscribe/", payload).then((res) => res.data);
};
