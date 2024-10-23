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
            dueDate: Joi.alternatives().try(Joi.date().optional(), Joi.string().valid('').optional()).allow(null), // Allow empty string or null
            checklist: Joi.array().items(
              Joi.object({
                task: Joi.string().required(),  
                completed: Joi.boolean().default(false),
                _id:Joi.string().optional()  
              })
            ).min(1).required(),  // Checklist must contain at least one item and is required
            assignedTo: Joi.alternatives().try(Joi.array().items(Joi.string().hex().length(24)).optional(), Joi.string().valid('').optional()).allow(null), // Allow empty string, array, or null
          }),
        },    
    updateStatus:{
      body:Joi.object({
        TaskId:Joi.string().hex().length(24).required(),
        Status:Joi.number().required()
      }),
    },
    updateChecklist:{
      body:Joi.object({
        TaskId:Joi.string().hex().length(24).required(),
        checklist: Joi.array().items(
              Joi.object({
                task: Joi.string().required(),  
                completed: Joi.boolean().default(false),
              })
            ).min(1).required(),
      }),
    },
    shareTask:{             //public route
      params: Joi.object({
        TaskId:Joi.string().hex().length(24).required(),
      }),
    },
    shareBoard:{
      body: Joi.object({
        sharedWith: Joi.string().hex().length(24).required(),
      }),
    },
    queryMiddleware:{
      query:Joi.object({
      filterBy: Joi.string().valid('day', 'week', 'month').optional(),
      sortBy: Joi.string().valid('created', 'updated').default('created'),  
      order: Joi.string().valid('asc', 'desc').default('desc'),  
      }),
    },
    searchUser:{
      query:Joi.object({
        email:Joi.string().required(),
      }),
    },
    deleteTask:{
      params:Joi.object({
        TaskId:Joi.string().hex().length(24).required(),
      }),
    },
    tickChecklist:{
      body:Joi.object({
        checklistItemId:Joi.string().hex().length(24).required(),
        status:Joi.boolean().required(),
      }),
    },
    editTask: {
      params: Joi.object({
        TaskId: Joi.string().hex().length(24).required(),
      }),
      body: Joi.object({
        title: Joi.string().max(100).required(),
        priority: Joi.number().valid(1, 2, 3).required(),
        dueDate: Joi.alternatives().try(Joi.date().optional(), Joi.string().valid('').optional()).allow(null), // Allow empty string or null
        checklist: Joi.array().items(
          Joi.object({
            task: Joi.string().required(),
            completed: Joi.boolean().default(false),
            _id: Joi.string().hex().length(24).optional(), // Optional _id for editing
          })
        ).min(1).required(),
        assignedTo: Joi.array().items(
          Joi.alternatives().try(
            Joi.string().hex().length(24), // Valid hex string for user IDs
            Joi.string().valid(''), // Allow empty strings in the array
            Joi.allow(null) // Allow null in the array
          )
        ).optional(),      }),
    }

};
module.exports = schemas;