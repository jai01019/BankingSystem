// ===================================
// routes/accounts.js
// ===================================
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Account = require("../models/Account");
const { auth } = require("../middleware/auth");

// Get user account info (for customers to see their own account)
router.get("/profile", auth(["customer"]), async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      account: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        balance: parseFloat(user.balance.toFixed(2)),
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.error("Get account profile error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
