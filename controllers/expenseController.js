import { Expense } from "../models/Expense.js";
import { Group } from "../models/Group.js";

/**
 * GET: Add Expense Page
 */
export const addExpensePage = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);
    if (!group) return res.send("Group not found");

    res.render("addExpense", {
      group,
      title: "Add Expense | SplitChain"
    });
  } catch (err) {
    console.log(err);
    res.send("Server error");
  }
};

/**
 * POST: Add Expense
 */
export const addExpense = async (req, res) => {
  try {
    const { groupId, amount, category, date, notes, splitWith } = req.body;

    if (!groupId) return res.send("Group missing");

    const members = splitWith ? splitWith.split(",") : [];

    const expense = await Expense.create({
      group: groupId,
      amount,
      category,
      date,
      notes,
      paidBy: req.session.userId,
      splitWith: members
    });

    await Group.findByIdAndUpdate(groupId, {
      $push: { expenses: expense._id }
    });

    res.redirect(`/groups/${groupId}`);
  } catch (err) {
    console.log(err);
    res.send("Error adding expense");
  }
};
