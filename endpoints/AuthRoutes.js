const express = require('express');
const router = express.Router();
const ValidationMiddleware = require('./../middlewares/ValidationMiddleware');
const { register, login } = require('./../controller/AuthController');

router.post("/register",ValidationMiddleware("register"),register); 
router.post("/login",ValidationMiddleware("login"),login); 

module.exports = router;