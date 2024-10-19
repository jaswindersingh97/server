const express = require('express');
const router = express.Router();
const ValidationMiddleware = require('./../middlewares/ValidationMiddleware');
const { register, login } = require('./../controller/AuthController');
const handleAsync = require('./../helperfunction/handleAsync');

router.post("/register",ValidationMiddleware("register"),handleAsync(register)); 
router.post("/login",ValidationMiddleware("login"),handleAsync(login)); 

module.exports = router;