const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
connectDB();

const corsOptions = require('./config/cors');
app.use(corsOptions)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/HelloWorld",(req,res)=>{
    res.send("hello World")
});

const AuthRoutes = require('./endpoints/AuthRoutes');
app.use("/auth",AuthRoutes);

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`App is running on port:${port}`)
});