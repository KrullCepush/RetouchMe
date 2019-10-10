const express = require("express");
const {
  sessionChecker,
  noSessionChecker,
  getUserId
} = require("../middleware/auth");
const User = require("../models/user");
const Task = require("../models/task");

const router = express.Router();

// route for Home-Page
router.get("/", (req, res) => {
  console.log(req.session);

  res.render("index", {
    user: getUserId(req)
  });
});

// route for user signup
router
  .route("/signup")
  .get(noSessionChecker, (req, res) => {
    res.render("signup");
  })
  .post(noSessionChecker, async (req, res) => {
    try {
      const user = new User({
        username: req.body.username,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password
      });
      await user.save();
      req.session.user = user;
      res.redirect("/dashboard");
    } catch (error) {
      res.render("signup", error);
    }
  });

// route for user Login
router
  .route("/login")
  .get(noSessionChecker, (req, res) => {
    res.render("login");
  })
  .post(noSessionChecker, async (req, res) => {
    const { login, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ login });
    console.log(user);

    if (!user) {
      const message = "Пользователя с таим логином не существует";
      res.render("login", { message });
    } else if (user.password !== password) {
      const message = "Пароль введён неверно";
      res.render("login", { message });
    } else {
      req.session.user = user;
      res.redirect("/dashboard");
    }
  });

// route for user's dashboard
router.get("/dashboard", sessionChecker, async (req, res) => {
  const openTasks = await Task.find({ status: true });
  const hiddenTasks = await Task.find({ status: false });
  const { user } = req.session;
  console.log(openTasks);

  res.render("dashboard", {
    user,
    openTasks,
    hiddenTasks
  });
});

// route for user logout
router.get("/logout", async (req, res, next) => {
  if (req.session.user && req.cookies) {
    try {
      res.clearCookie("user_sid");
      await req.session.destroy();
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
