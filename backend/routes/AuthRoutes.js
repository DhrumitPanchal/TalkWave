const express = require("express");
const {
  handelUserRegistration,
  handelUserLogin,
  handelUserUpdate,
  handelJwtTokenBasedLogin,
} = require("../controllers/Auth");
const Router = express.Router();
Router.post("/register", handelUserRegistration);
Router.post("/login", handelUserLogin);
Router.post("/jwt", handelJwtTokenBasedLogin);
Router.put("/update", handelUserUpdate);

module.exports = Router;
