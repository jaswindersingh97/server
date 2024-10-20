const express = require('express');
const router = express.Router();

const handleAsync = require('./../helperfunction/handleAsync');
const {getTask} = require('./../controller/PublicController');
const ValidationMiddleware = require('../middlewares/ValidationMiddleware');

router.get("/shareTask:TaskId",ValidationMiddleware("shareTask"),handleAsync(getTask));

module.exports = router;