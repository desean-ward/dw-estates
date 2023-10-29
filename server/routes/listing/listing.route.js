const express = require("express");
const listingCtrl = require("../../controllers/listing/listing.controller");
const verifyToken = require("../../utils/verity-token");

const router = express.Router();

router.get("/get/:id", listingCtrl.getListing);

router.post("/create", verifyToken, listingCtrl.createListing);
router.put("/update/:id", verifyToken, listingCtrl.updateListing);

router.delete("/delete/:id", verifyToken, listingCtrl.deleteListing);

module.exports = router;
