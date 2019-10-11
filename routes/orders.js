const express = require('express');

const router = express.Router();

const { sessionChecker, isAdmin } = require('../middleware/auth');

const Task = require('../models/task');
const User = require('../models/user');


router.get('/', (req, res) => {
  res.render('orders/orderForm');
});


module.exports = router;
