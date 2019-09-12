const mongoose = require('../models/connectDb');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, require: true, },

  description: { type: String, require: true },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true, },

  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', require: true, }],

  createdAt: { type: Date, dafault: Date.now, }
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;