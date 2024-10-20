const Task = require("../models/TaskModel");

const shareTask = async(req,res)=>{
    const {TaskId} = req.params;

    const response = await Task.findOne({_id:TaskId})

    if(!response){
        return res.status(404).json({error:"The task not found"})
    }
    return res.status(200).json({message:"Task fetched successfully",response});
};

module.exports = {getTask}