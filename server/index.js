const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const userRouter = require("./routes/user/user.route");
const authRouter = require("./routes/auth/auth.route");

require("dotenv").config();
require("./config/database");

// Initialize express
const app = express();

// Initialize port
const port = process.env.PORT || 4000;

// Middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

// Error Handler Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Check for token and create a req.user prop in the request
app.use(require("./config/check-token"));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// Listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
