const express = require('express');

const router = express.Router();

const { sessionChecker, isAdmin } = require('../middleware/auth');

const Task = require('../models/task');
const User = require("../models/user");


router.route('/')
  .get(isAdmin, async (req, res, next) => {
    const openTasks = await Task.find({ status: false, approved: true, inProgress: false });
    const completedTasks = await Task.find({ status: true, approved: true, inProgress: false });
    const unapprovedTasks = await Task.find({ approved: false });
    const { user } = req.session;

    res.render('dashboard', {
      user,
      openTasks,
      completedTasks,
      unapprovedTasks,
    });
  });

router.route('/:id')
  .get(sessionChecker, async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    const user = await User.findById(req.session.user._id);
    res.render('tasks/show', { task, user });
  })
  .post(sessionChecker, isAdmin, async (req, res, next) =>{
    
  })
  // .put(isAdmin, async (req, res, next) => {
  //   const task = await Task.findById(req.params.id);
  //   task.email = req.body.email;
  //   task.password = req.body.password;
  //   await task.save();
  //   res.redirect(`/tasks/${task.id}`);
  // })
  // .delete(isAdmin, async (req, res, next) => {
  //   await task.findByIdAndDelete(req.params.id);
  //   res.redirect('/tasks');
  // });

module.exports = router;
