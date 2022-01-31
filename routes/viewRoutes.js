const express = require("express");
const authController = require("../controllers/authController");
const viewController = require("../controllers/viewController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewController.getOverview);
router.get("/me", authController.protect, viewController.getUserHome);
router.get("/login", authController.isLoggedIn, viewController.getLoginForm);
router.get("/signup", authController.isLoggedIn, viewController.getSignupForm);
router.get("/advice", viewController.getAdvice);

module.exports = router;
