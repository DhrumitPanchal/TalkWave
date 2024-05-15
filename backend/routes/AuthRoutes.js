const express = require("express");
const {
  handelUserRegistration,
  handelUserLogin,
  handelUserUpdate,
  handelJwtTokenBasedLogin,
  handelGetAllUsers,
  handelSendRequest,
  handelAddFriend,
  handelGetFriends,
  getNotifications,
} = require("../controllers/Auth");
const Router = express.Router();
Router.get("/users", handelGetAllUsers);
Router.post("/register", handelUserRegistration);
Router.post("/login", handelUserLogin);
Router.post("/jwt", handelJwtTokenBasedLogin);
Router.put("/update", handelUserUpdate);
Router.post("/sendfriendrequest", handelSendRequest);
Router.post("/addfriends", handelAddFriend);
Router.post("/getfriends", handelGetFriends);
Router.post("/getnotifications", getNotifications);

module.exports = Router;
