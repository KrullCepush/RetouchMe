const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  status: { type: Boolean, default: false },
  approved: { type: Boolean, default: false },
  issuedBy: String,
  title: String,
  info: String,
  amount: Number,
  cost: Number,
  link: String,
  retouchedLink: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);
