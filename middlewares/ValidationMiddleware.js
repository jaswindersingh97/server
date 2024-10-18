const schemas = require('./../ValidationSchemas/Schemas');

const ValidationMiddleware = async (req, res, next) => {
    const { body, params, query } = schemas[schemaType];
  
    const validate = (schema, data, key) => {
      if (schema) {
        const { error } = schema.validate(data);
        if (error) {
          return res.status(400).json({ error: `${key}: ${error.details[0].message}` });
        }
      }
    };
  
    validate(body, req.body, 'Body');
    validate(params, req.params, 'Params');
    validate(query, req.query, 'Query');
  
    next();
  };
  

module.exports = ValidationMiddleware