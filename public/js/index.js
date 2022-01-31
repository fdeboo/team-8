// import axios from "axios";
console.log("hia");
const login = async (email, password) => {
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

const signup = async (userData) => {
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

      //   const { user } = res.data.data;

      window.setTimeout(() => {
        location.assign("http://127.0.0.1:3000/me");
      }, 1500);
    }
  } catch (err) {
    console.log("error", err.response.data.message);
    // showAlert("error", err.response.data.message);
  }
};

const loginForm = document.querySelector(".form--login");
const signupForm = document.querySelector(".form--signup");
const workleForm = document.querySelector(".form--workle");
console.log(workleForm);

if (loginForm) {
  loginForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (workleForm) {
  workleForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const radioInputs = document.getElementsByName("emotion");
    let selectedEmotion;
    console.log(radioInputs);

    for (let i = 0; i < radioInputs.length; i++) {
      console.log(radioInputs[i]);
      if (radioInputs[i].checked) {
        selectedEmotion = radioInputs[i];
      }
    }

    console.log(selectedEmotion);

    const emotion = document.getElementById("email").value;
    const comment = document.getElementById("comment").value;
    // login(email, comment);
  });
}

// document.querySelector(".signup").addEventListener("click", () => {
//   console.log("clicked Signup");
//   const userData = {
//     name: "Scooby",
//     email: "melvindoo@mysteryinc.io",
//     password: "password9389",
//     passwordConfirm: "password9389",
//   };
//   signup(userData);
// });
