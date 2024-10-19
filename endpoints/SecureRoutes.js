const express = require('express');
const router = express.Router();

const handleAsync = require('./../helperfunction/handleAsync');
const ValidationMiddleware = require('../middlewares/ValidationMiddleware');
const { getCurrentUser,createTask,changeStatus,updateChecklist,getTasks } = require('../controller/SecureController');

// user based routes
router.get("/getUser",handleAsync(getCurrentUser))

//Task based routes
router.patch("/updateStatus",ValidationMiddleware("updateStatus"),handleAsync(changeStatus));
router.patch("/updateChecklist",ValidationMiddleware("updateChecklist"),handleAsync(updateChecklist))
router.post("/createTask",ValidationMiddleware("createTask"),handleAsync(createTask));
router.get("/getTasks",getTasks);
module.exports = router;