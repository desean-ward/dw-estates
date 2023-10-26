const express = require("express");
const router = express.Router();
const userCtrl = require("../../controllers/user/user.controller");
const verifyToken = require("../../utils/verity-token");

// GET routes
router.get("/hello", userCtrl.hello);

// POST routes
router.post("/update/:id", verifyToken, userCtrl.updateUser);
router.delete("/delete/:id", verifyToken, userCtrl.deleteUser);

module.exports = router;
