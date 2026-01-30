import express from "express";
import contract from "../blockchain-bridge/contract.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
import * as expenseController from "../controllers/expenseController.js";
router.get("/add/:groupId", auth, expenseController.addExpensePage);

router.post("/add", auth, expenseController.addExpense);

router.get("/add/:groupId", auth, expenseController.addExpensePage);

router.post("/add", async (req, res) => {
  try {
    const { title, amount, splitWith } = req.body;

    const tx = await contract.addExpense(
      title,
      splitWith,
      {
        value: amount   
      }
    );

    await tx.wait();

    res.json({
      success: true,
      txHash: tx.hash
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
