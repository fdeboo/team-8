const path = require("path");

exports.getOverview = async (req, res, next) => {
  console.log("WELCOME HOME");

  res.status(200).render("overview", {});
};

exports.userhome = async (req, res, next) => {
  console.log(req.user);
  res.status(200).render("workle", {});
};
