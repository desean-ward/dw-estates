const Listing = require("../../models/listing/listing.model");
const errorHandler = require("../../utils/errors");

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

const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    // Check if listing exists
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// GET - get all listings
const getListings = async (req, res, next) => {
  try {
    // Create a limit of 9 listings per page
    const limit = parseInt(req.query.limit) || 9;

    // Create a start index for pagination
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    // Check if offer is undefined or false
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    // Check if furnished is undefined or false
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    // Check if parking is undefined or false
    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    // Check if type is undefined or all
    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    // Check for query params
    const searchTerm = req.query.searchTerm || "";

    // Check if sort is defined; else, createdAt
    const sort = req.query.sort || "createdAt";

    // Check if order is defined; else, desc
    const order = req.query.order || "desc";

    // Find all listings with query params
    const listings = await Listing.find({
      title: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    // Check if listings exist
    if (!listings) {
      return next(errorHandler(404, "Listings not found"));
    }

    return res.status(200).json(listings);
  } catch (error) {
    console.log("ERROR", error);
    next(error);
  }
};

// DELETE - delete a listing by id
const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

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

const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  // Check if listing exists
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  // Check if user is updating their own listing
  if (listing.userRef !== req.user.id) {
    return next(errorHandler(401, "You can only update your own listings"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Check if listing was updated
    if (!updatedListing) {
      return next(errorHandler(400, "Listing could not be updated"));
    }

    return res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createListing,
  getListing,
  getListings,
  deleteListing,
  updateListing,
};
