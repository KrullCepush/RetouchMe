const express = require('express');
const Httpsproxyagent = require('https-proxy-agent');

const router = express.Router();
const Telegraf = require('telegraf');
const { sessionChecker, isAdmin } = require('../middleware/auth');

const Task = require('../models/task');
const User = require('../models/user');

const bot = new Telegraf('878779383:AAEQ6ZT6Xmw7BZPo89yO-bLBmHFAIgGq5ac', {
  telegram: {
    agent: new Httpsproxyagent('http://167.71.59.12:3128'),
  },
});

bot.start((ctx) => ctx.reply('Welcome'));

router
  .route('/')
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
  })
  .post(async (req, res, next) => {
    try {
      const task = new Task({
        cltName: req.body.cltName,
        cltEmail: req.body.cltEmail,
        cltPhone: req.body.cltPhone,
        cltComments: req.body.cltComments,
        amount: req.body.amount,
        cost: req.body.cost,
        cltLink: req.body.cltlink,
        cltFile: req.file.path,
      });
      await task.save();
      bot.telegram.sendMessage(
        347672329,
        `Новая заявка: http://plsretouch.me/tasks/${task.id}, стоимость: ${task.cost}`,
      );
      res.redirect('/orders');
    } catch (error) {
      res.render('orders/orderForm', {
        error,
      });
    }
  });

router.route('/:id').get(sessionChecker, async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  const user = await User.findById(req.session.user._id);
  res.render('tasks/show', { task, user });
});
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
