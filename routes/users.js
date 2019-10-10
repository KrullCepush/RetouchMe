const express = require('express');

const router = express.Router();

const User = require('../models/user');
const { isAdmin, isAuthorized } = require('../middleware/auth');

router.route('/')
  .get(isAdmin, async (req, res, next) => {
    const users = await User.find();
    res.render('users/index', { users });
  });

router.route('/:id/edit')
  .get(isAuthorized, async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.render('users/edit', { user });
  });

router.route('/:id')
  .get(isAuthorized, async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.render('users/show', { user });
  })
  .put(isAuthorized, async (req, res, next) => {
    const user = await User.findById(req.params.id);
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save();
    res.redirect(`/users/${user.id}`);
  })
  .delete(isAdmin, async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
  });

module.exports = router;
