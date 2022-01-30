const path = require("path");

exports.getOverview = async (req, res, next) => {
  console.log("WELCOME HOME");

  res.status(200).render("overview", {});
};

exports.getLoginForm = async (req, res, next) => {
  console.log("LOGIN PLEASE");
  console.log("HELLO WORLD");

  res.status(200).render("login", {});
};

exports.getSignupForm = async (req, res, next) => {
  console.log("SIGNIN PLEASE");

  res.status(200).render("signup", {});
};

exports.getUserHome = async (req, res, next) => {
  console.log(req.user);
  res.status(200).render("workle", {});
};

exports.getAdvice = async (req, res, next) => {
  res.status(200).render("advice.pug", {});
};
