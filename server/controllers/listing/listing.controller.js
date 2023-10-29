const Listing = require("../../models/listing/listing.model");

const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);

    // Check if listing was created
    if (!listing) {
      return next(errorHandler(400, "Listing could not be created"));
    }

    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  console.log("LISTING", listing);

  // Check if listing exists
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  // Check if user is deleting their own listing
  if (listing.userRef !== req.user.id) {
    return next(errorHandler(401, "You can only delete your own listings"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json("Listing has been deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createListing,
  deleteListing,
};
