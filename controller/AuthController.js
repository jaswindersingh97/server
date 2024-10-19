const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('./../models/UserModel');

const register = async(req,res) => {
    const {name,email,password} = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ error: 'User already exists with this email.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({Message:"user Created successfully",_id:response._id}); // 201 Created
};

const login = async(req,res) =>{
    const { email , password } = req.body;
        
    const user = await User.findOne({email}).select("+password");
    
    if(!user){
        return res.status(400).json({error:"Invalid email or password."});
    }
        
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({error:"Invalid email or password."});
    }

    const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
    const token = jwt.sign(
        {userId:user._id},
        JWT_SECRET,
        {expiresIn:"8h"}
    );
    res.status(200).json({token:token,message:"Login successfull"});
};

module.exports = {register,login}