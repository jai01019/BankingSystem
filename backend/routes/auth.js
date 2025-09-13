// ===================================
// routes/auth.js
// ===================================
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateAccessToken } = require("../middleware/auth");

const JWT_SECRET = process.env.JWT_SECRET;

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!["customer", "banker"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Check if user already exists with same email and role
    const existingUser = await User.findOne({ email, role });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email and role" });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    // Generate 36-character access token
    const accessToken = generateAccessToken();

    // Also generate JWT for compatibility
    const jwtToken = jwt.sign(
      { userId: user._id, role: user.role, accessToken },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return user without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      balance: user.balance,
      created_at: user.created_at,
    };

    res.status(201).json({
      message: "Signup successful",
      user: userResponse,
      token: jwtToken,
      accessToken,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate input
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ error: "Email, password, and role are required" });
    }

    console.log("Login attempt:", { email, role });

    // Find user by email and role
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate 36-character access token
    const accessToken = generateAccessToken();

    // Generate JWT token
    const jwtToken = jwt.sign(
      { userId: user._id, role: user.role, accessToken },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return user without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      balance: user.balance,
      created_at: user.created_at,
    };

    console.log("Login successful for:", user.email);

    res.json({
      message: "Login successful",
      user: userResponse,
      token: jwtToken,
      accessToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get current user profile
router.get(
  "/profile",
  require("../middleware/auth").auth(["customer", "banker"]),
  async (req, res) => {
    try {
      const userResponse = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        balance: req.user.balance,
        created_at: req.user.created_at,
      };

      res.json({ user: userResponse });
    } catch (err) {
      console.error("Profile error:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
