const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: { type: String, enum: ["deposit", "withdrawal"], required: true },
  amount: { type: Number, required: true, min: 0.01 },
  balance_after: { type: Number, required: true }, // Balance after transaction
  description: { type: String, default: "" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Account", accountSchema);
