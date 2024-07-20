import axios from "axios";

const LOGIN_API_URL = process.env.REACT_APP_LOGIN_API_URL;
const GET_API_URL = process.env.REACT_APP_GET_API_URL;
const LOGOUT_API_URL = process.env.REACT_APP_LOGOUT_API_URL;

export const login = async (email, password) => {
  const response = await axios.post(`${LOGIN_API_URL}`, { email, password });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const getDetails = async () => {
  const response = await axios.get(`${GET_API_URL}`, {
    headers: {
      Authorization: `Bearer ${getCurrentUser().data.access_token}`,
    },
  });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${LOGOUT_API_URL}`, {}, {
    headers: {
      Authorization: `Bearer ${getCurrentUser().data.access_token}`,
    },
  });
  if (response.data) {
    localStorage.removeItem("user");
  }
  return response.data;
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
