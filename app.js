import 'dotenv/config';
import express from "express";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import connectDB from "./config/db.js";
import User  from "./models/User.js";
import {authRoutes} from "./routes/auth.js";
import groupRoutes from "./routes/group.js";
import expenseRoutes from "./routes/expense.js";
import cors from "cors";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.use(session({
  secret: "codex_secret_key",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions"
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(async (req, res, next) => {
  if (req.session.userId) {
    res.locals.user = await User.findById(req.session.userId).select("name");
  } else {
    res.locals.user = null;
  }
  next();
});

// Routes
app.use("/", authRoutes);
app.use("/groups", groupRoutes);
app.use("/expenses", expenseRoutes);

app.get("/", (req, res) => res.render("index"));

app.listen(3000, () => console.log("Server running on port 3000"));
