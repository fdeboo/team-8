const path = require("path");

exports.userhome = async (req, res, next) => {
  console.log("WELCOME HOME");
  res.status(200).json({
    status: "success",
    message: "welcome user",
  });
};

exports.home = async (req, res, next) => {
  console.log("WELCOME HOME");

  res.sendFile(path.join(__dirname, "index.html"));
};
