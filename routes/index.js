const express = require('express');
const { sessionChecker, noSessionChecker } = require('../middleware/auth');
const User = require('../models/user');
const Task = require('../models/task');

const router = express.Router();

// route for Home-Page
router.get('/', (req, res) => {
  res.render('index');
});

// route for user signup
router.route('/signup')
  .get(noSessionChecker, (req, res) => {
    res.render('signup');
  })
  .post(noSessionChecker, async (req, res) => {
    try {
      const user = new User({
        username: req.body.username,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
      });
      await user.save();
      req.session.user = user;
      res.redirect('/dashboard');
    } catch (error) {
      res.render('signup', error);
    }
  });


// route for user Login
router.route('/login')
  .get(noSessionChecker, (req, res) => {
    res.render('login');
  })
  .post(noSessionChecker, async (req, res) => {
    const { login, password } = req.body;

    const user = await User.findOne({ login });
    if (!user) {
      const message = 'Пользователя с таим логином не существует';
      res.render('login', message);
    } else if (user.password !== password) {
      const message = 'Пароль введён неверно';
      res.render('login', message);
    } else {
      req.session.user = user;
      res.redirect('/dashboard');
    }
  });


// route for user's dashboard
router.get('/dashboard', sessionChecker, async (req, res) => {
  const openTasks = Task.find({ status: true });
  const hiddenTasks = Task.find({ status: true });
  const { user } = req.session;
  res.render('dashboard', {
    user,
    openTasks,
    hiddenTasks,
  });
});


// route for user logout
router.get('/logout', async (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    try {
      res.clearCookie('user_sid');
      await req.session.destroy();
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect('/login');
  }
});


module.exports = router;
