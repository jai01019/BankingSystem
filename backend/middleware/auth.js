// ===================================
// middleware/auth.js
// ===================================
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");

// Generate 36-character alphanumeric access token
const generateAccessToken = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 36; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

const auth = (roles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.header("Authorization");

      if (!authHeader) {
        console.log("❌ No Authorization header found");
        return res.status(401).json({ error: "No token provided" });
      }

      // Support both Bearer token and direct token
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.replace("Bearer ", "")
        : authHeader;

      console.log("✅ Extracted Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Decoded Token:", decoded);

      const user = await User.findById(decoded.userId);
      console.log("✅ Query Result (User):", user);

      if (!user) {
        console.log("❌ No user found with this ID");
        return res
          .status(401)
          .json({ error: "Invalid token - user not found" });
      }

      console.log("✅ User Role:", user.role);
      console.log("✅ Allowed Roles:", roles);

      if (roles.length && !roles.includes(user.role)) {
        console.log("❌ Access Denied - Role not allowed");
        return res.status(403).json({ error: "Access denied" });
      }

      req.user = user;
      console.log("✅ Authentication successful, moving to next middleware");
      next();
    } catch (e) {
      console.error("❌ Auth Middleware Error:", e.message);
      res.status(401).json({ error: "Please authenticate" });
    }
  };
};

module.exports = { auth, generateAccessToken };
