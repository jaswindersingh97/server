const express = require('express');
const router = express.Router();

const handleAsync = require('./../helperfunction/handleAsync');
const ValidationMiddleware = require('../middlewares/ValidationMiddleware');
const { 
    getCurrentUser,
    createTask,
    changeStatus,
    updateChecklist,
    getTasks,
    shareBoard,
    searchUser,
    deleteTask,
    tickChecklist,
    editTask,
    updateUser,
    Analytics
    } = require('../controller/SecureController');

const queryHandler  = require('./../middlewares/queryMiddleware');

// user based routes
router.get("/getUser",handleAsync(getCurrentUser));
router.get("/searchUser",ValidationMiddleware("searchUser"),handleAsync(searchUser));
router.patch("/updateUser",ValidationMiddleware("updateUser"),handleAsync(updateUser));

//Task based routes
router.get("/getTasks",ValidationMiddleware("queryMiddleware"),queryHandler,handleAsync(getTasks));
router.post("/createTask",ValidationMiddleware("createTask"),handleAsync(createTask));
router.patch("/updateStatus",ValidationMiddleware("updateStatus"),handleAsync(changeStatus));
router.patch("/updateChecklist",ValidationMiddleware("updateChecklist"),handleAsync(updateChecklist));
router.patch("/tickChecklist",ValidationMiddleware("tickChecklist"),handleAsync(tickChecklist)) //taskId,checklistItemId
router.delete("/deleteTask/:TaskId",ValidationMiddleware("deleteTask"),handleAsync(deleteTask));
router.put("/editTask/:TaskId",ValidationMiddleware("editTask"),handleAsync(editTask));
router.get("/Analytics",handleAsync(Analytics))

//ShareBoard with user
router.patch("/shareBoard",ValidationMiddleware("shareBoard"),handleAsync(shareBoard));


module.exports = router;