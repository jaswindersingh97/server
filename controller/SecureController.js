const mongoose = require('mongoose')
const User = require('./../models/UserModel');
const Task = require('./../models/TaskModel');
const bcrypt = require('bcrypt');
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

const changeStatus = async(req,res) =>{
    const {TaskId, Status} = req.body;
    const response = await Task.findByIdAndUpdate(TaskId,
        {status:Status}, {new:true});  
    if(!response){
        return res.status(404).json({error:"TaskId is wrong"});
    }
    res.status(200).json({message:"Status updated succesfully",response})
};

const updateChecklist = async(req,res) =>{  // can be used for both updating the status of checklist item 
    const {TaskId,checklist} = req.body;
    const response = await Task.findByIdAndUpdate(TaskId,
        {checklist},{new:true}
    )
    if(!response){
        return res.status(404).json({error:"TaskId is wrong"});
    }
    res.status(200).json({message:"checklist updated succesfully",response});
}

const getTasks = async (req,res) =>{
    const { userId } = req.user;
    const response = await Task.find({
        visibleTo: { $in: [userId] },
        ...req.dateFilter
      }).populate("assignedTo")
      .sort(req.sortOption);  
  
      if (response.length > 0) {
        res.status(200).json({message:'Tasks fetched successfully ',response});
      } else {
        res.status(404).json({ message: 'No tasks found',response });
      }
};
const shareBoard = async (req,res) =>{
    const {userId} = req.user;
    const {sharedWith} = req.body;

    const response = await Task.updateMany(
        { visibleTo: { $in: [userId] } },  
        { $addToSet: { visibleTo: sharedWith } }  
      );

      if (response.modifiedCount > 0) {
        res.status(200).json({ message: 'Tasks updated successfully',response });
      } else {
        res.status(404).json({ message: 'No tasks found to update', response });
      }
};
const searchUser = async(req,res)=>{
    const {email} = req.query;
    const users = await User.find({ email: { $regex: email, $options: 'i' } });
    res.status(200).json(users);
}
const deleteTask = async(req,res)=>{
    const {TaskId} = req.params;
    const task = await Task.findByIdAndDelete(TaskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });

}

const tickChecklist = async(req,res)=>{
    const {checklistItemId,status} = req.body;
    const task = await Task.findOne({
        "checklist._id": checklistItemId
      });
  
      if (!task) {
        throw new Error("Task or checklist item not found");
      }
      const checklistItem = task.checklist.id(checklistItemId);
      checklistItem.completed = status;

      await task.save();
      return res.status(200).json({message:"The item updated successfully",task})
};

const editTask = async(req,res)=>{
    const {TaskId} = req.params;
    const {assignedTo,checklist,dueDate,priority,title}= req.body;

    const response = await Task.findByIdAndUpdate(TaskId,
        {assignedTo,checklist,dueDate,priority,title},
        {new:true}
    )
    res.status(200).json({message:"The task updated successfully",response});
}

const updateUser = async (req, res) => {
    const { userId } = req.user; 
    const { name, email, oldPassword, newPassword } = req.body;
    const updateFields = {};

    if (name) updateFields.name = name;
    if (email) updateFields.email = email;

    if (!oldPassword && !newPassword) {
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: "No fields to update." });
        }

        const response = await User.findByIdAndUpdate(userId, updateFields, { new: true });
        return res.status(200).json({ message: "Data updated successfully", user: response });
    }
    const user = await User.findById(userId).select('+password');
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ error: "The old password is incorrect. Please try again." });
    }
    if (newPassword) {
        updateFields.password = await bcrypt.hash(newPassword, 10); 
    }

    const response = await User.findByIdAndUpdate(userId, updateFields, { new: true });
    return res.status(200).json({ message: "User updated successfully", user: response });
};

const Analytics = async(req,res)=>{
    const {userId} = req.user;
    const counts = await Task.aggregate([
        {
          $match: {
            visibleTo: new mongoose.Types.ObjectId(userId),
          }
        },
        {
          $facet: {
            statusCount: [{
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                    }
                }
            ],
            priorityCount: [{
                $group: {
                  _id: "$priority",
                  count: { $sum: 1 },
                    }
                }
            ],
            dueDateCount: [{
                $group: {
                  _id: { $cond: [{ $ifNull: ["$dueDate", false] }, "hasDueDate", "noDueDate"] },
                  count: { $sum: 1 },
                    }
                }
            ]
          }
        }
      ]);
      res.status(200).json({message:"Count fetched successfully",counts});
}
module.exports = {getCurrentUser,createTask,changeStatus,updateChecklist,getTasks,shareBoard,searchUser,deleteTask,tickChecklist,editTask,updateUser,Analytics}