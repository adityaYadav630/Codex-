import { Group } from "../models/Group.js";
import { Expense } from "../models/Expense.js";

export const groupPage = async (req, res) => {
  try {
    const groups = await Group.find({ owner: req.session.userId });
    res.render("groups", { groups, title: "Your Groups | SplitChain" , user: res.locals.user});
  } catch (err) {
    console.log(err);
    res.render("groups", { groups: [] });
  }
};

export const addNote = async (req, res) => {
  try {
    const { note } = req.body;
    const groupId = req.params.id;

    if (!note) return res.send("Note missing");

    // abhi dummy response
    res.redirect(`/groups/${groupId}`);
  } catch (err) {
    console.log(err);
    res.send("Error adding note");
  }
};

export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    await Group.create({
      name,
      members: members ? members.split(",") : [],
      owner: req.session.userId
    });

    res.redirect("/groups");
  } catch (err) {
    console.log(err);
    res.send("Group creation failed");
  }
};

export const groupDetails = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.send("Group not found");

    const expenses = await Expense.find({ group: req.params.id });

    res.render("groupDetails", { 
      group, 
      expenses, 
      title: "Group | SplitChain" 
    });
  } catch (err) {
    console.log(err);
    res.send("Group not found");
  }
};
