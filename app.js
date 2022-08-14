require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const usersRouter = require("./routes/users");
const homeRouter = require("./routes/home");

app.use("/users", usersRouter);
app.use("/", homeRouter);

module.exports = app;
