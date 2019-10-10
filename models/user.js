const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  status: { type: Boolean, default: false },
  name: { type: String, required: true },
  login: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  projects: [],
  completedProjects: [],
  rejectedProjects: [],
  info: [],
});

module.exports = mongoose.model('User', userSchema);
