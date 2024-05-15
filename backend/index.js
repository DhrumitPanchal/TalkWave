const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

const cors = require("cors");
const authRoute = require("./routes/AuthRoutes");
const messageRoute = require("./routes/MessageRoutes");
const { app, server } = require("./socket/Socket");
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);
app.use("/message", messageRoute);
app.get("/", (req, res) => {
  res.status(200).send("api is running...");
});

try {
  server.listen(process.envPORT || 8000, () =>
    console.log("server is running...")
  );
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("mongodb connected"));
} catch (error) {
  console.log("connection failed : " + error.message);
}
