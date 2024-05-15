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
  handelUpload,
} = require("../controllers/Auth");
const upload = require("../middleware/Multer");
const Router = express.Router();
Router.get("/users", handelGetAllUsers);
Router.post("/register", handelUserRegistration);
Router.post("/login", handelUserLogin);
Router.post("/jwt", handelJwtTokenBasedLogin);
Router.put("/update", handelUserUpdate);
Router.post("/upload", upload.single("profilePic"), handelUpload);
Router.post("/sendfriendrequest", handelSendRequest);
Router.post("/addfriends", handelAddFriend);
Router.post("/getfriends", handelGetFriends);
Router.post("/getnotifications", getNotifications);

module.exports = Router;
