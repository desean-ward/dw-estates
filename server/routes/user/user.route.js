const express = require("express");
const router = express.Router();
const userCtrl = require("../../controllers/user/user.controller");

// Import routes
router.get("/hello", userCtrl.hello);

module.exports = router;
