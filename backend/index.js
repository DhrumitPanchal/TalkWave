const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/AuthRoutes");
const messageRoute = require("./routes/MessageRoutes");

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);
app.use("/message", messageRoute);
app.get("/", (req, res) => {
  res.status(200).send("api is running...");
});

try {
  app.listen(process.envPORT || 8000, () =>
    console.log("server is running...")
  );
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("mongodb connected"));
} catch (error) {
  console.log("connection failed : " + error.message);
}
