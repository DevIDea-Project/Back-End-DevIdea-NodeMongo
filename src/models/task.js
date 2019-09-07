const mongoose = require('./connectDb');
//const bcrypt = require('bcryptjs');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  project: {
    type: mongoose.Schema.types.ObjectId,
    ref: 'Project',
    require: true,
  },

  assignedTo: {
    type: mongoose.Schema.types.ObjectId,
    ref: 'User',
    require: true,
  },

  completed: {
    type: Boolean,
    require: true,
    default: false,
  },

  createdAt: {
    type: Date,
    dafault: Date.now,
  }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;