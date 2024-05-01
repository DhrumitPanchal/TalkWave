const express = require("express");
const {
  handelSendMessage,
  handelGetMessages,
} = require("../controllers/Message");
const Router = express.Router();
Router.post("/send/:receiverId", handelSendMessage);
Router.post("/get/:receiverId", handelGetMessages);

module.exports = Router;
