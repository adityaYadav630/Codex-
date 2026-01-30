import express from "express";
import dotenv from "dotenv";

import groupRoutes from "./routes/group.route.js";
import expenseRoutes from "./routes/expense.route.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/group", groupRoutes);
app.use("/expense", expenseRoutes);

app.listen(3000, () =>
  console.log("Backend running on port 3000")
);
