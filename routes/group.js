import express from "express";  
import contract from "../blockchain-bridge/contract.js";
const router = express.Router();
import * as groupController from "../controllers/groupController.js";
import { auth } from "../middleware/auth.js";

router.get("/", auth, groupController.groupPage);

router.post("/create", auth, groupController.createGroup);

router.get("/:id", auth, groupController.groupDetails);

router.post("/:id/add-note", auth, groupController.addNote);

export default  router;