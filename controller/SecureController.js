const User = require('./../models/UserModel');
const Task = require('./../models/TaskModel');

const getCurrentUser =async(req,res)=>{
    const {userId} = req.user;
    const user = await User.findOne({_id:userId})
    
    return res.status(200).json({message:"User fetched", user})
}

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

module.exports = {getCurrentUser,createTask}