const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  status: { type: Boolean, default: false },
  approved: { type: Boolean, default: false },
  inProgress: { type: Boolean, default: false },
  cltName: {
    type: String,
    required: [true, "can't be blank"],
  },
  cltEmail: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  cltPhone: {
    type: String,
    required: [true, "can't be blank"],
  },
  title: String,
  cltComments: String,
  amount: Number,
  cost: Number,
  cltlink: String,
  rtchLink: String,
  cltFiles: [],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);
