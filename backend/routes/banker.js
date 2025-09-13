// ===================================
// routes/banker.js (NEW FILE)
// ===================================
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Account = require("../models/Account");
const { auth } = require("../middleware/auth");

// Get all customer accounts (banker only)
router.get("/customers", auth(["banker"]), async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" })
      .select("-password")
      .sort({ created_at: -1 });

    const customersWithStats = await Promise.all(
      customers.map(async (customer) => {
        const transactionCount = await Account.countDocuments({
          user_id: customer._id,
        });
        const lastTransaction = await Account.findOne({
          user_id: customer._id,
        }).sort({ created_at: -1 });

        return {
          id: customer._id,
          name: customer.name,
          email: customer.email,
          balance: parseFloat(customer.balance.toFixed(2)),
          transaction_count: transactionCount,
          last_transaction: lastTransaction ? lastTransaction.created_at : null,
          created_at: customer.created_at,
        };
      })
    );

    res.json({
      customers: customersWithStats,
      total_customers: customers.length,
    });
  } catch (err) {
    console.error("Get customers error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get specific customer's transaction history (banker only)
router.get(
  "/customers/:customerId/transactions",
  auth(["banker"]),
  async (req, res) => {
    try {
      const { customerId } = req.params;

      // Verify customer exists
      const customer = await User.findOne({
        _id: customerId,
        role: "customer",
      }).select("-password");

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      // Get customer's transactions
      const transactions = await Account.find({ user_id: customerId }).sort({
        created_at: -1,
      });

      res.json({
        customer: {
          id: customer._id,
          name: customer.name,
          email: customer.email,
          balance: parseFloat(customer.balance.toFixed(2)),
          created_at: customer.created_at,
        },
        transactions: transactions.map((txn) => ({
          id: txn._id,
          type: txn.type,
          amount: txn.amount,
          balance_after: txn.balance_after,
          description: txn.description,
          created_at: txn.created_at,
        })),
        total_transactions: transactions.length,
      });
    } catch (err) {
      console.error("Get customer transactions error:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// Get banking overview/statistics (banker only)
router.get("/overview", auth(["banker"]), async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalTransactions = await Account.countDocuments();

    // Calculate total deposits and withdrawals
    const depositSum = await Account.aggregate([
      { $match: { type: "deposit" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const withdrawalSum = await Account.aggregate([
      { $match: { type: "withdrawal" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Get total balance across all customers
    const totalBalanceResult = await User.aggregate([
      { $match: { role: "customer" } },
      { $group: { _id: null, total: { $sum: "$balance" } } },
    ]);

    const totalDeposits = depositSum.length > 0 ? depositSum[0].total : 0;
    const totalWithdrawals =
      withdrawalSum.length > 0 ? withdrawalSum[0].total : 0;
    const totalBalance =
      totalBalanceResult.length > 0 ? totalBalanceResult[0].total : 0;

    // Recent transactions
    const recentTransactions = await Account.find()
      .populate("user_id", "name email")
      .sort({ created_at: -1 })
      .limit(10);

    res.json({
      overview: {
        total_customers: totalCustomers,
        total_transactions: totalTransactions,
        total_deposits: parseFloat(totalDeposits.toFixed(2)),
        total_withdrawals: parseFloat(totalWithdrawals.toFixed(2)),
        total_balance: parseFloat(totalBalance.toFixed(2)),
      },
      recent_transactions: recentTransactions.map((txn) => ({
        id: txn._id,
        customer_name: txn.user_id.name,
        customer_email: txn.user_id.email,
        type: txn.type,
        amount: txn.amount,
        balance_after: txn.balance_after,
        created_at: txn.created_at,
      })),
    });
  } catch (err) {
    console.error("Get banking overview error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
