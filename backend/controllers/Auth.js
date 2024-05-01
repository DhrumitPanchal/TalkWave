const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

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
  console.log(email, password);
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
      console.log(result);
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

module.exports = {
  handelGetAllUsers,
  handelUserRegistration,
  handelUserLogin,
  handelUserUpdate,
  handelJwtTokenBasedLogin,
};
