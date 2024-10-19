const express = require('express');
const router = express.Router();

const handleAsync = require('./../helperfunction/handleAsync');
const ValidationMiddleware = require('../middlewares/ValidationMiddleware');
const { getCurrentUser,createTask } = require('../controller/SecureController');

router.get("/getUser",handleAsync(getCurrentUser))

router.post("/createTask",ValidationMiddleware("createTask"),handleAsync(createTask));

module.exports = router;