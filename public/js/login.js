import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign(`/`);
      }, 1500);
    }
  } catch (err) {
    console.log("error", err.response.data);
    showAlert("error", err.response.data.message);
  }
};

export const signup = async (userData) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/signup",
      data: userData,
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      console.log("success", "Logged in successfully!");

      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log("error", err.response.data.message);
    showAlert("error", err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/logout",
    });

    if ((res.data.status = "success")) location.assign("/");
  } catch {
    console.log("error", err.response.data.message);
    showAlert("error", "Error logging out! Try again.");
  }
};
