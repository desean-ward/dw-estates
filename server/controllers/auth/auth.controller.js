const User = require("../../models/user/user.modal");
const bcrypt = require("bcrypt");

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
    next(error);
  }
};

module.exports = {
  signup,
};
