const Joi = require('joi');

const schemas ={
    register: {
        body: Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            }),
        },
    login: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(), 
            }),
        },
    createTask:{
        body:Joi.object({
            title: Joi.string().max(100).required(),  
            priority: Joi.number().valid(1, 2, 3).required(),  
            dueDate: Joi.date().optional(),
            checklist: Joi.array().items(
              Joi.object({
                task: Joi.string().required(),  
                completed: Joi.boolean().default(false)  
              })
            ).min(1).required(),  // Checklist must contain at least one item and is required
            assignedTo: Joi.array().items(Joi.string().hex().length(24)).optional(),  // Array of user IDs, optional
          }),
        },    
    updateStatus:{
      body:Joi.object({
        TaskId:Joi.string().hex().length(24).required(),
        currentStatus:Joi.number().required()
      }),
    },
    updateChecklist:{
      body:Joi.object({
        TaskId:Joi.string().hex().length(24).required(),
        checklist: Joi.array().items(
              Joi.object({
                task: Joi.string().required(),  
                completed: Joi.boolean().default(false)  
              })
            ).min(1).required(),
      }),
    },
};
module.exports = schemas;