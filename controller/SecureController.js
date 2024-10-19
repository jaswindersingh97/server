const Task = require('./../models/TaskModel');

const createTask = async (req, res) => {
    const { userId } = req.user;
    const { title, priority, assignedTo, checklist, dueDate } = req.body;

    const response = await Task.create({
        title,
        priority,
        checklist,
        assignedTo,
        dueDate,
        createdBy: userId  
    });

    return res.status(201).json({ message: "Task created successfully", response });
};

module.exports = {createTask}