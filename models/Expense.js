import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  amount: Number,
  category: String,
  date: Date,
  notes: String,
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  splitWith: [String]
}, { timestamps: true });

export const Expense = mongoose.model("Expense", expenseSchema);
