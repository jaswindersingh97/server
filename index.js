const express = require('express');
const app = express();

app.get("/HelloWorld",(req,res)=>{
    res.send("hello World")
});

app.listen(3000,()=>{
    console.log("App is running on port :3000")
});