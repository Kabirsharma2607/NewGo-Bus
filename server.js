require("dotenv").config();
const express = require("express");
const dbConfig = require("./config/dbConfig");
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is listening on Port: ${port}`);
});
