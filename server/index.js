const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/user/user.route");

require("dotenv").config();

const mongo = process.env.MONGO_URI;

// Initialize express
const app = express();

// Initialize port
const port = process.env.PORT || 4000;

app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);


// Connect to MongoDB
mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
