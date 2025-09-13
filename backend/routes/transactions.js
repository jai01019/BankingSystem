// routes/transactions.js
// ===================================
const express = require("express");
const router = express.Router();
const Account = require("../models/Account");
const User = require("../models/User");
const { auth } = require("../middleware/auth");

// Get customer transactions and balance
router.get("/", auth(["customer"]), async (req, res) => {
  try {
    // Get current user's balance
    const user = await User.findById(req.user._id);

    // Get all transactions for this customer
    const transactions = await Account.find({ user_id: req.user._id }).sort({
      created_at: -1,
    });

    res.json({
      balance: parseFloat(user.balance.toFixed(2)),
      transactions: transactions.map((txn) => ({
        id: txn._id,
        type: txn.type,
        amount: txn.amount,
        balance_after: txn.balance_after,
        description: txn.description,
        created_at: txn.created_at,
      })),
    });
  } catch (err) {
    console.error("Get transactions error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Create transaction (deposit/withdrawal)
router.post("/", auth(["customer"]), async (req, res) => {
  try {
    const { amount, type, description = "" } = req.body;

    // Validate input
    if (!amount || !type) {
      return res.status(400).json({ error: "Amount and type are required" });
    }

    if (!["deposit", "withdrawal"].includes(type)) {
      return res
        .status(400)
        .json({ error: "Type must be 'deposit' or 'withdrawal'" });
    }

    const transactionAmount = parseFloat(amount);
    if (transactionAmount <= 0) {
      return res.status(400).json({ error: "Amount must be greater than 0" });
    }

    // Get current user
    const user = await User.findById(req.user._id);
    let newBalance = user.balance;

    // Check for sufficient funds on withdrawal
    if (type === "withdrawal") {
      if (user.balance < transactionAmount) {
        return res.status(400).json({ error: "Insufficient funds" });
      }
      newBalance = user.balance - transactionAmount;
    } else {
      newBalance = user.balance + transactionAmount;
    }

    // Create transaction record
    const transaction = await Account.create({
      user_id: req.user._id,
      type,
      amount: transactionAmount,
      balance_after: newBalance,
      description,
    });

    // Update user balance
    await User.findByIdAndUpdate(req.user._id, { balance: newBalance });

    res.status(201).json({
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} successful`,
      transaction: {
        id: transaction._id,
        type: transaction.type,
        amount: transaction.amount,
        balance_after: transaction.balance_after,
        description: transaction.description,
        created_at: transaction.created_at,
      },
      newBalance: parseFloat(newBalance.toFixed(2)),
    });
  } catch (err) {
    console.error("Create transaction error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get transaction by ID
router.get("/:id", auth(["customer"]), async (req, res) => {
  try {
    const transaction = await Account.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({
      transaction: {
        id: transaction._id,
        type: transaction.type,
        amount: transaction.amount,
        balance_after: transaction.balance_after,
        description: transaction.description,
        created_at: transaction.created_at,
      },
    });
  } catch (err) {
    console.error("Get transaction error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
