const express = require('express');

const router = express.Router();
const { sessionChecker } = require('../middleware/auth');

const Task = require('../models/task');
const { isAdmin } = require('../middleware/auth');

router.route('/')
  .get(isAdmin, async (req, res, next) => {
    const openTasks = await Task.find({ status: true });
    const hiddenTasks = await Task.find({ status: false });

    res.render('tasks/index', {
      openTasks,
      hiddenTasks,
    });
  });

router.route('/:id')
  .get(sessionChecker, async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    res.render('tasks/show', { task });
  })
  .put(isAuthorized, async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    task.email = req.body.email;
    task.password = req.body.password;
    await task.save();
    res.redirect(`/tasks/${task.id}`);
  })
  .delete(isAdmin, async (req, res, next) => {
    await task.findByIdAndDelete(req.params.id);
    res.redirect('/tasks');
  });

module.exports = router;
