import express from "express";
import contract from "../blockchain-bridge/contract.js";

const router = express.Router();

// create group
router.post("/create", async (req, res) => {
  try {
    const { name, members } = req.body;

    const tx = await contract.createGroup(name, members);
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
