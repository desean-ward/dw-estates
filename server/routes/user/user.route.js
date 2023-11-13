const express = require("express");
const router = express.Router();
const userCtrl = require("../../controllers/user/user.controller");
const verifyToken = require("../../utils/verity-token");

// GET routes
router.get("/agents", userCtrl.getAgents);
// Get the user's listings
router.get("/listings/:id", verifyToken, userCtrl.getUserListings);

// Get a user's profile
router.get("/:id", verifyToken, userCtrl.getUser);

// Get all agents

// POST routes
// Update the user's profile
router.post("/update/:id", verifyToken, userCtrl.updateUser);

// DELETE routes
// Delete the user's profile
router.delete("/delete/:id", verifyToken, userCtrl.deleteUser);

module.exports = router;
