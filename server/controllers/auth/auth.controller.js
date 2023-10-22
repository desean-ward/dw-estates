const User = require("../../models/user/user.modal");
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

    // User created successfully
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
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
        data: rest,
      });
  } catch (error) {
    next(error);
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  signin,
};
