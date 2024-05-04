const express = require("express");
const {
  handelUserRegistration,
  handelUserLogin,
  handelUserUpdate,
  handelJwtTokenBasedLogin,
  handelGetAllUsers,
  handelAddFriend,
  handelGetFriends,
} = require("../controllers/Auth");
const Router = express.Router();
Router.get("/users", handelGetAllUsers);
Router.post("/register", handelUserRegistration);
Router.post("/login", handelUserLogin);
Router.post("/jwt", handelJwtTokenBasedLogin);
Router.put("/update", handelUserUpdate);
Router.post("/addfriends", handelAddFriend);
Router.post("/getfriends", handelGetFriends);

module.exports = Router;
