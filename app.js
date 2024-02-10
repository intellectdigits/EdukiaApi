const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv')



var app=express();
const PORT = process.env.PORT||3000;
dotenv.config({ path: './config/config.env' })

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})


// Middleware
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))



app.use(express.json());
app.use(require("./routes/index"))


app.listen(PORT,console.log(`listening at ${PORT}`))
