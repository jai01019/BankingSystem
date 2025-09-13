const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["customer", "banker"], required: true },
  balance: { type: Number, default: 0 }, // Add balance field for customers
  created_at: { type: Date, default: Date.now },
});

// Compound index to ensure unique email per role
userSchema.index({ email: 1, role: 1 }, { unique: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
