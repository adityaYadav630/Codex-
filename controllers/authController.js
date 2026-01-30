import User  from "../models/User.js";
import bcrypt from "bcryptjs";

export const loginPage = (req, res) => {
  res.render("login", { title: "Login | SplitChain" });
};

export const registerPage = (req, res) => {
  res.render("register", { title: "Register | SplitChain" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, wallet } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.send("User already exists");

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      wallet
    });

    req.session.userId = user._id;
    res.redirect("/groups");
  } catch (err) {
    console.log(err);
    res.send("Register error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.send("Wrong password");

    req.session.userId = user._id;
    res.redirect("/groups");
  } catch (err) {
    console.log(err);
    res.send("Login error");
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
