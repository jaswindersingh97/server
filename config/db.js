const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const connectDB = () =>{    
    try{    
    mongoose.connect(MONGO_URI,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
    console.log("Mongo DB connected Successfully");}
    catch(error){
        console.log("Something went wrong while connecting to DB", error.message);
        process.exit(1);
    }
}
module.exports = connectDB;