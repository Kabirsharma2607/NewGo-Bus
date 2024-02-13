require("dotenv").config();
const express = require("express");
const dbConfig = require("./config/dbConfig");
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
const usersRoute = require("./routes/usersRoutes");
app.use("/api/users", usersRoute);

app.listen(port, () => {
  console.log(`App is listening on Port: ${port}`);
});
