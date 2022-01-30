const express = require("express");
const authController = require("../controllers/authController");
const viewController = require("../controllers/viewController");

const router = express.Router();

// router.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "/index.html"));
// });

router.get("/", authController.protect, viewController.userhome);
router.get("/", viewController.home);
// router.get("/login", authController.isLoggedIn, viewsController.getLoginForm);
// router.get("/me", authController.protect, viewsController.getAccount);

module.exports = router;
