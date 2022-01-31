const path = require("path");

exports.getOverview = async (req, res, next) => {
  res.status(200).render("overview", {});
};

exports.getLoginForm = async (req, res, next) => {
  res.status(200).render("login", {});
};

exports.getSignupForm = async (req, res, next) => {
  res.status(200).render("signup", {});
};

exports.getUserHome = async (req, res, next) => {
  res.status(200).render("workle", {});
};

exports.getAdvice = async (req, res, next) => {
  res.status(200).render("advice.pug", {});
};
