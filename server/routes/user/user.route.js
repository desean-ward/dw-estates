const express = require("express");
const router = express.Router();
const userCtrl = require("../../controllers/user/user.controller");
const verifyToken = require("../../utils/verity-token");

// GET routes
// Get the user's listings
router.get("/listings/:id", verifyToken, userCtrl.getUserListings);
router.get("/:id", verifyToken, userCtrl.getUser);

// POST routes
// Update the user's profile
router.post("/update/:id", verifyToken, userCtrl.updateUser);

// DELETE routes
// Delete the user's profile
router.delete("/delete/:id", verifyToken, userCtrl.deleteUser);

module.exports = router;
