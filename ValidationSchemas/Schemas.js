const Joi = require('joi');

const schemas ={
    register: {
        body: Joi.object({
            username: Joi.string().min(3).max(20).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            gender: Joi.string().valid('male', 'female', 'non-binary', 'other').default('other'),
            }),
        },
    login: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(), 
            }),
        },
};
module.exports = schemas;