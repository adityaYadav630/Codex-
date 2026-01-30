import express from "express";
import contract from "../blockchain-bridge/contract.js";

const router = express.Router();

router.post("/add-expense", async (req, res) => {
  try {
    const { title, amount, splitWith } = req.body;

    const tx = await contract.addExpense(
      title,
      splitWith,
      {
        value: amount   // 👈 ETH yahan ja rahi hai
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
