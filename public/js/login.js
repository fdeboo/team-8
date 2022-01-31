import axios from "axios";
// import { showAlert } from './alerts';

export const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/login",
      data: {
        email,
        password,
      },
    });

    console.log(res);

    if (res.data.status === "success") {
      //   showAlert("success", "Logged in successfully!");

      //   const { user } = res.data.data;
      console.log("SUCCESSFUL");

      window.setTimeout(() => {
        location.assign(`/`);
      }, 1500);
    }
  } catch (err) {
    console.log("error", err.response.data);
    // showAlert("error", err.response.data.message);
  }
};

export const signup = async (userData) => {
  console.log(userData);

  try {
    console.log(userData);
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/signup",
      data: userData,
    });

    console.log(res);

    if (res.data.status === "success") {
      // showAlert("success", "Logged in successfully!");
      console.log("success", "Logged in successfully!");

      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log("error", err.response.data.message);
    // showAlert("error", err.response.data.message);
  }
};
