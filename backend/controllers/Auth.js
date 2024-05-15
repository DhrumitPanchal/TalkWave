const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { getReceiverSocketId, io } = require("../socket/Socket");
const { handleUpload } = require("../cloudinary");
async function handelGetAllUsers(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json({ msg: "user get successfully ", users });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "internal server error", error: error.message });
  }
}

async function handelUserRegistration(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(403).json({ msg: "all details are required" });
  }

  if (password.length < 6) {
    return res
      .status(403)
      .json({ msg: "password length is at least six character" });
  }

  try {
    const checkUserExist = await User.findOne({ email });
    if (checkUserExist) {
      return res.status(403).json({ msg: "User already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashPassword,
    });

    user.save();

    return res.status(201).json({ msg: "user register successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "internal server error", error: error.message });
  }
}

async function handelUserLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({ msg: "all details are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "invalid credential" });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(403).json({ msg: "invalid credential" });
    }
    const payload = { ...user };
    const access_Token = await jwt.sign(payload, process.env.JWT_SECRETE);

    return res
      .status(200)
      .json({ msg: "login successfully", user, access_Token });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "internal server error", error: error.message });
  }
}

async function handelJwtTokenBasedLogin(req, res) {
  const { access_Token } = req.body;
  try {
    if (access_Token) {
      const result = await jwt.verify(access_Token, process.env.JWT_SECRETE);
      if (result) {
        const user = await User.findById(result._doc._id);
        return res
          .status(200)
          .json({ msg: "successfully login with jwt", user: user });
      } else {
        return res.status(403).json({ msg: "Internal token" });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "internal server error", error: error.message });
  }
}

async function handelUserUpdate(req, res) {
  const { id, data } = req.body;

  if (!id) {
    return res.status(403).json({ msg: "user id undefine" });
  }
  if (!data) {
    return res.status(403).json({ msg: "user details is undefine" });
  }

  const isValidObjectId = await mongoose.isValidObjectId(id);
  if (!isValidObjectId) {
    return res.status(403).json({ msg: "invalid user id" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

    return res
      .status(200)
      .json({ msg: "updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "internal server error", error: error.message });
  }
}

async function handelAddFriend(req, res) {
  const { userId, friendId } = req.body;
  console.log("check data : " + userId + " - " + friendId);

  if (!userId || !friendId) {
    return res.status(403).json({ msg: "userId undefine" });
  }

  if (
    !mongoose.isValidObjectId(userId) ||
    !mongoose.isValidObjectId(friendId)
  ) {
    return res.status(403).json({ msg: "invalid userId" });
  }

  try {
    const friend = await User.findById(friendId);
    const user = await User.findById(userId);

    if (!friend || !user) {
      return res.status(404).json({ msg: "user not found" });
    }

    const checkIsAlreadyAdded = user.friends.filter((fri) => fri == friendId);
    if (checkIsAlreadyAdded.length > 0) {
      return res.status(404).json({ msg: "user already added" });
    }

    const result = await User.findByIdAndUpdate(userId, {
      $push: { friends: friendId },
    });

    await User.findByIdAndUpdate(friendId, {
      $push: { friends: userId },
    });

    const receiverSocketId = getReceiverSocketId(friendId);
    console.log("add friend id : " + receiverSocketId);

    io.to(receiverSocketId).emit("requestaccepted", {
      _id: user?._id,
      name: user?.name,
      about: user?.about,
      profilePic: user?.profilePic,
    });

    return res
      .status(200)
      .json({ msg: "user added successfully", result, friendId });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "internal server error", error: error.message });
  }
}

async function handelGetFriends(req, res) {
  const { _id } = req.body;
  if (!_id) {
    return res.status(403).json({ msg: "userId undefined" });
  }

  try {
    const user = await User.findById(_id).populate({
      path: "friends",
      model: "user", // Assuming your user model is named "User"
      select: "_id name about profilePic",
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const friends = user.friends.map((friend) => ({
      _id: friend._id,
      name: friend.name,
      about: friend.about,
      profilePic: friend.profilePic,
    }));

    return res
      .status(200)
      .json({ msg: "Friends fetched successfully", friends });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
}

async function handelSendRequest(req, res) {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(403).json({ msg: "userId undefine" });
  }

  if (
    !mongoose.isValidObjectId(userId) ||
    !mongoose.isValidObjectId(friendId)
  ) {
    return res.status(403).json({ msg: "invalid userId" });
  }

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend || !user) {
      return res.status(404).json({ msg: "user not found" });
    }

    const getRequests = await friend?.notification.filter(
      (msg) => msg?.type === "request"
    );

    const checkIfAlreadyRequested = getRequests?.filter(
      (msg) => msg?.requester?._id == userId
    );
    if (checkIfAlreadyRequested.length > 0) {
      return res.status(404).json({ msg: "already requested" });
    }

    const sendRequest = await User.findByIdAndUpdate(friendId, {
      $push: {
        notification: { type: "request", requester: user, status: "pending" },
      },
    });
    const receiverSocketId = getReceiverSocketId(friendId);
    io.to(receiverSocketId).emit("newNotification", {
      type: "request",
      requester: user,
      status: "pending",
    });
    return res.status(200).json({ msg: "request send", sendRequest });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
}

async function getNotifications(req, res) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(403).json({ msg: "userId undefine" });
  }

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(403).json({ msg: "invalid userId" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    res.status(200).json({ notifications: user?.notification });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
}

async function handelUpload(req, res) {
  try {
    const b64 = Buffer.from(req?.file?.buffer).toString("base64");
    let dataURI = "data:" + req?.file?.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.status(200).json({ ProfilePicUrl: cldRes.url });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, msg: "Internal server error" });
  }
}
module.exports = {
  handelGetAllUsers,
  handelUserRegistration,
  handelUserLogin,
  handelUserUpdate,
  handelJwtTokenBasedLogin,
  handelAddFriend,
  handelGetFriends,
  handelSendRequest,
  getNotifications,
  handelUpload,
};
