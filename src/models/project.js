const mongoose = require('./connectDb');
//const bcrypt = require('bcryptjs');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true
  },

  user:{
    type: mongoose.Schema.types.ObjectId,
    ref: 'User',
    require: true,
  },

  tasks: [{
    type: mongoose.Schema.types.ObjectId,
    ref: 'Task',
  }],

  createdAt: {
    type: Date,
    dafault: Date.now,
  }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;