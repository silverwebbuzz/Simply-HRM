// const config = require("./helper/config");
const http = require("http");
const mongoose = require("mongoose");
const express = require("express");
// const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
// const multer = require("multer");
const routes = require("../Simply/routes/app");
const app = express();

const server = http.createServer(app);

app.use(bodyParser.json());

// app.use(
//   bodyParser.urlencoded({
//     limit: "500mb",
//     extended: true,
//     parameterLimit: 100000000,
//   })
// );

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const con = mongoose.connection;

con.on("open", () => {
  console.log("connected...");
});

app.get("/", (req, res) => {
  res.send("app working");
});

app.use("/api", routes);

server.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log("Server Up And Working....🍺🍺🍺" + process.env.PORT);
});
