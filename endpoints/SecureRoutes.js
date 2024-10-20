const express = require('express');
const router = express.Router();

const handleAsync = require('./../helperfunction/handleAsync');
const ValidationMiddleware = require('../middlewares/ValidationMiddleware');
const { getCurrentUser,createTask,changeStatus,updateChecklist,getTasks,shareBoard} = require('../controller/SecureController');

// user based routes
router.get("/getUser",handleAsync(getCurrentUser))

//Task based routes
router.get("/getTasks",getTasks);
router.post("/createTask",ValidationMiddleware("createTask"),handleAsync(createTask));
router.patch("/updateStatus",ValidationMiddleware("updateStatus"),handleAsync(changeStatus));
router.patch("/updateChecklist",ValidationMiddleware("updateChecklist"),handleAsync(updateChecklist));

//ShareBoard with user
router.patch("/shareBoard",ValidationMiddleware("shareBoard"),handleAsync(shareBoard));

module.exports = router;