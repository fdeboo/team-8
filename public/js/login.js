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

      const { user } = res.data.data;

      window.setTimeout(() => {
        location.assign(`/${user._id}`);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

document.querySelector(".login-form").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email);
  login(email, password);
});
