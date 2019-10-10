const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  status: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  username: {
    type: String, required: [true, "can't be blank"],
  },
  login: {
    type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
  },
  email: {
    type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  password: { type: String, required: [true, "can't be blank"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tasks: [],
  completedTasks: [],
  rejectedTasks: [],
  info: String,
});

userSchema.plugin(uniqueValidator, { message: 'is already taken.' });

module.exports = mongoose.model('User', userSchema);
