const express = require("express");
const {
  handelUserRegistration,
  handelUserLogin,
  handelUserUpdate,
  handelJwtTokenBasedLogin,
  handelGetAllUsers,
} = require("../controllers/Auth");
const Router = express.Router();
Router.get("/users", handelGetAllUsers);
Router.post("/register", handelUserRegistration);
Router.post("/login", handelUserLogin);
Router.post("/jwt", handelJwtTokenBasedLogin);
Router.put("/update", handelUserUpdate);

module.exports = Router;
