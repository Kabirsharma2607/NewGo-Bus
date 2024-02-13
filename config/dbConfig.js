const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to database");
});

db.on("error", () => {
  console.log("Connection failed");
});
