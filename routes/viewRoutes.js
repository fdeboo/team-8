const express = require("express");
const authController = require("../controllers/authController");
const viewController = require("../controllers/viewController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewController.getOverview);
router.get("/me", authController.protect, viewController.userhome);

module.exports = router;
