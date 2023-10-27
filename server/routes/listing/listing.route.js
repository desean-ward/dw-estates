const express = require("express");
const listingCtrl = require("../../controllers/listing/listing.controller");
const verifyToken = require("../../utils/verity-token");

const router = express.Router();

router.post("/create", verifyToken, listingCtrl.createListing);

module.exports = router;