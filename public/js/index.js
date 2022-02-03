import "@babel/polyfill";
import { login, logout, signup } from "./login";
// import { hideAlert, showAlert } from './alerts';

const loginForm = document.querySelector(".form--login");
const signupForm = document.querySelector(".form--signup");
const workleForm = document.querySelector(".form--workle");
const logoutBtn = document.querySelector(".logout");

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
    for (const radioInput of radioInputs) {
      if (radioInput.checked) {
        selectedEmotion = radioInputs.value;
      }
    }

    console.log(selectedEmotion);

    const emotion = document.getElementById("email").value;
    const comment = document.getElementById("comment").value;
  });
}

if (logoutBtn) logoutBtn.addEventListener("click", logout);
