const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
})
  .on("disconnected", function () {
    console.log(`Disconnected from ${db.name} at ${db.host}:${db.port}`);
  })
  .on("error", function (err) {
    console.log(`Error connecting to ${db.name} at ${db.host}:${db.port}`);
    console.log(err);
  })
