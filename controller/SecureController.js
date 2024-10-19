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
    const {userId} = req.user;
    const response = await Task.findOne({visibleTo: { $in: [userId] }});
      
    return res.status(200).json({message:"Tasks fetched succefully",response});
}

module.exports = {getCurrentUser,createTask,changeStatus,updateChecklist,getTasks}