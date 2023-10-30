const express = require("express");
const listingCtrl = require("../../controllers/listing/listing.controller");
const verifyToken = require("../../utils/verity-token");

const router = express.Router();

// GET - get all listings
router.get("/get", listingCtrl.getListings);
// GET - get a listing by id
router.get("/get/:id", listingCtrl.getListing);

// POST - create a listing
router.post("/create", verifyToken, listingCtrl.createListing);
// PUT - update a listing
router.put("/update/:id", verifyToken, listingCtrl.updateListing);

// DELETE - delete a listing
router.delete("/delete/:id", verifyToken, listingCtrl.deleteListing);

module.exports = router;
