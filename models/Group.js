import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  members: [{ type: String }],

  expenses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expense"
  }],

  createdAt: { type: Date, default: Date.now }
});

export const Group = mongoose.model("Group", groupSchema);
