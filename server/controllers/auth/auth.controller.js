const User = require("../../models/user/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("../../utils/errors");

// Note: The 'next' parameter is used to call the next middleware function in the stack.
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Note: The 'password' field is removed from the user object before sending it to the client.
    const { password: pass, ...rest } = user._doc;

    // Set the access_token cookie in the client browser
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      })
      .status(200)
      .json({
        success: true,
        message: "User created successfully",
        ...rest,
      });
  } catch (error) {
    next(error.message);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    // Check if the password is valid
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentials"));

    // Create a JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // Note: The 'password' field is removed from the user object before sending it to the client.
    const { password: pass, ...rest } = validUser._doc;

    // Set the access_token cookie in the client browser
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      })
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        ...rest,
      });
  } catch (error) {
    next(error);
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

// Sign in with Google
const google = async (req, res, next) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
        })
        .status(200)
        .json({
          success: true,
          message: "User logged in successfully",
          ...rest,
        });
    } else {
      // Create a new user with the Google account
      // The password is auto-generated
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = await User.create({
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      // Create a JWT token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = newUser._doc;

      // Set the access_token cookie in the client browser
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
        })
        .status(200)
        .json({
          success: true,
          message: "User logged in successfully",
          ...rest,
        });
    }
  } catch (error) {
    console.log("Error in google signin", error.message);
    next(error);
  }
};

const signout = async (req, res, next) => {
  try {
    // Clear cookie
    res.clearCookie("access_token");

    // Send response
    res.status(200).json("User has been logged out");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
  google,
  signout,
};
