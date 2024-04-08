/* eslint-disable camelcase */

import jwtDecode from "jwt-decode";

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getDecodedJwt = (tokn = "") => {
  try {
    const now = new Date();

    const token = getToken();
    if (now.getSeconds() > 259200) {
      localStorage.removeItem(token);
      return null;
    }
    const t = token || tokn;

    const decoded = jwtDecode(t);
    return decoded;
  } catch (e) {
    return e;
  }
};

export const setRefreshToken = (refreshToken) => {
  localStorage.setItem("refreshToken", refreshToken);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const removeDomainObj = () => {
  localStorage.removeItem("domain");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const logOut = () => {
  removeToken();
};

export const isAuthenticated = () => {
  try {
    const decodedToken = getDecodedJwt();
    if (decodedToken) {
      const { exp } = decodedToken;
      const currentTime = Date.now() / 1000;
      return exp > currentTime;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export const isPatient = () => {
  try {
    const decodedToken = getDecodedJwt();
    if (decodedToken) {
      const { role } = decodedToken;
      if (role === "PATIENT") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
export const isDoctor = () => {
  try {
    const decodedToken = getDecodedJwt();
    if (decodedToken) {
      const { role } = decodedToken;
      if (role === "DOCTOR") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
