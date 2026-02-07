const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/userModel");

dotenv.config();

async function signup(req, res) {
  const { username, password, email } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const saved = await newUser.save();

    const token = jwt.sign({ id: saved._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, userId: saved._id });
  } catch (err) {
    console.error("Error during signup:", err.message);
    res.status(500).send("Server error");
  }
}

async function login(req, res) {
  const { email, username, password } = req.body;
  try {
    if (!password || (!email && !username)) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    // Allow login with either email or username
    const query = email ? { email } : { username };
    const user = await User.findOne(query);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).send("Server error");
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find({}).select("username email");
    res.json(users);
  } catch (err) {
    console.error("Error during fetching users:", err.message);
    res.status(500).send("Server error");
  }
}

async function getUserProfile(req, res) {
  const currentID = req.params.id;
  try {
    const user = await User.findById(currentID).select("username email repositories");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err.message);
    res.status(500).send("Server error");
  }
}

async function updateUserProfile(req, res) {
  const currentID = req.params.id;
  const { email, password } = req.body;
  try {
    const updateFields = {};
    if (email) updateFields.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    const result = await User.findByIdAndUpdate(currentID, updateFields, {
      new: true,
    }).select("username email repositories");

    if (!result) return res.status(404).json({ message: "User not found" });
    res.json(result);
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(500).send("Server error");
  }
}

async function deleteUserProfile(req, res) {
  const currentID = req.params.id;
  try {
    const result = await User.findByIdAndDelete(currentID);
    if (!result) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User Profile Deleted!" });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).send("Server error");
  }
}

module.exports = {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};