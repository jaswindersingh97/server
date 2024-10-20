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
  visibleTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
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

// Pre-save hook to ensure visibleTo contains createdBy and assignedTo on creation
taskSchema.pre('save', function (next) {
  // Ensure visibleTo contains createdBy
  if (!this.visibleTo || this.visibleTo.length === 0) {
    this.visibleTo = [this.createdBy];
  }

  // Ensure all assignedTo users are in visibleTo
  this.assignedTo.forEach(user => {
    if (!this.visibleTo.includes(user)) {
      this.visibleTo.push(user);
    }
  });

  next();
});

// Pre-update hook to automatically update visibleTo when assignedTo changes
taskSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();

  // If the assignedTo field is being updated
  if (update.assignedTo) {
    // Get the current task being updated
    const task = await this.model.findOne(this.getQuery());

    // Ensure createdBy is included in visibleTo
    const updatedVisibleTo = new Set(task.visibleTo.map(user => user.toString()));
    updatedVisibleTo.add(task.createdBy.toString());

    // Ensure newly assigned users are added to visibleTo
    update.assignedTo.forEach(user => {
      updatedVisibleTo.add(user.toString());
    });

    // Update the visibleTo field
    update.visibleTo = Array.from(updatedVisibleTo);
  }

  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
