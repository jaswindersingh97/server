const express = require('express');
const router = express.Router();

const handleAsync = require('./../helperfunction/handleAsync');
const ValidationMiddleware = require('../middlewares/ValidationMiddleware');
const { createTask } = require('../controller/SecureController');

router.post("/createTask",ValidationMiddleware("createTask"),handleAsync(createTask));

module.exports = router;