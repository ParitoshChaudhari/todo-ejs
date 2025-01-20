const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: false,
  },
  taskPriority: {
    type: String,
    require: true,
  },
  taskStatus: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
