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

const changeStatus = async(req,res) =>{
    const {TaskId, currentStatus} = req.body;
    const response = await Task.findByIdAndUpdate(TaskId,
        {status:currentStatus}, {new:true});  
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
      }).sort(req.sortOption);  
  
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
module.exports = {getCurrentUser,createTask,changeStatus,updateChecklist,getTasks,shareBoard,searchUser,deleteTask}