const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  priority: {
    type: Number,
    enum: [1, 2, 3],  // 1 for Low, 2 for Moderate, 3 for High
    required: true,
  },
  dueDate: {
    type: Date,
  },
  checklist: [{
    task: {
      type: String,
      required: true,  // Each checklist item is required
    },
    completed: {
      type: Boolean,
      default: false,
    }
  }],
  status: {
    type: Number,
    enum: [1, 2, 3, 4],  // 1: To-Do, 2: Backlog, 3: In-Progress, 4: Done
    default: 1,  // Default to 'To-Do'
  },
  visibleTo: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    default: function() {
      return [this.createdBy];  // Default to the creator
    }
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
