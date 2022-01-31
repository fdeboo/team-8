import "@babel/polyfill";
import { login, logout } from "./login";
// import { hideAlert, showAlert } from './alerts';

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
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const passwordConfirm = document.getElementById(
      "signup-password-confirm"
    ).value;

    const userData = {
      name,
      email,
      password,
      passwordConfirm,
    };

    signup(userData);
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
