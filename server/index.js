const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const mongo = process.env.MONGO_URI;

// Initialize express
const app = express();

const port = process.env.PORT || 4000;

// Connect to MongoDB
mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
