const Conversation = require("../models/conversation");
const Message = require("../models/messageModel");
var mongoose = require("mongoose");
const { getReceiverSocketId , io} = require("../socket/Socket");
async function handelSendMessage(req, res) {
  const { senderId, message } = req.body;
  const { receiverId } = req.params;
  if (!senderId) {
    return res.status(403).json({ msg: "senderId undefined" });
  }

  if (!receiverId) {
    return res.status(403).json({ msg: "receiverId undefined" });
  }

  if (!message) {
    return res.status(403).json({ msg: "message undefined" });
  }

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage?._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMsg", newMessage);
    }

    return res.status(201).json({ msg: "message sent", newMessage });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "internal server error", error: error.message });
  }
}

async function handelGetMessages(req, res) {
  const { senderId } = req.body;
  const { receiverId } = req.params;

  if (!senderId) {
    return res.status(403).json({ msg: "senderId undefined" });
  }

  if (!receiverId) {
    return res.status(403).json({ msg: "receiverId undefined" });
  }

  try {
    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    }).populate({
      path: "messages",
      select: "_id senderId receiverId message createdAt",
    });

    if (!conversation) {
      return res
        .status(200)
        .json({ msg: "not have any message", messages: [] });
    }

    const messages = conversation.messages;
    return res.status(200).json({ msg: "get message successfully", messages });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "internal server error", error: error.message });
  }
}
module.exports = {
  handelSendMessage,
  handelGetMessages,
};
