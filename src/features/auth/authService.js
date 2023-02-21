import axios from "axios";
import { toast } from "react-toastify";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Login User

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/user/login`,
      userData
    );
    if (response.statusText === "OK") {
      toast.success("Logged in successfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Get Login Status

export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/user/getLoginStatus`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/user/logout`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Get userData
export const getUser = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/user/getUser`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
