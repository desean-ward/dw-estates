const bcrypt = require("bcrypt");
const User = require("../../models/user/user.model");
const errorHandler = require("../../utils/errors");
const Listing = require("../../models/listing/listing.model");

const updateUser = async (req, res, next) => {
  // Check if user is updating their own profile
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own profile"));
  }

  try {
    // Hash password
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    // Remove password from response
    const { password, ...rest } = updatedUser._doc;

    // Send response
    res.status(200).json(rest);
  } catch (error) {
    console.log("Update error", error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  // Check if user is deleting their own account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account"));
  }

  try {
    // Delete user
    await User.findByIdAndDelete(req.params.id);

    // Clear cookie
    res.clearCookie("token");

    // Send response
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

const getUserListings = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only view your own listings"));
  }

  try {
    const listings = await Listing.find({ userRef: req.params.id });

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Export routes
module.exports = {
  updateUser,
  deleteUser,
  getUserListings,
  getUser,
};
