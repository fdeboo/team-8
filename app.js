const express = require("express");
const path = require("path");
const User = require("./models/userModel");

const app = express();

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// ROUTES:
app.post("/api/v1/signup", async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,

      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

module.exports = app;
