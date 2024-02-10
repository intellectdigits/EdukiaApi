const express = require('express');
const Model = require('../Model/model');
const courses = require('../Model/courses');
const Cart = require('../Model/Cart');
const Learning = require('../Model/Learning');
const Resource = require('../Model/Resource');
const charts = require('../Model/charts');
const subscription = require('../Model/subscriptions');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const User = require("../Model/user");
const PasswordReset = require("../App/Http/Models/PasswordReset");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const fs = require('fs');
 
const router = require('express').Router()


router.get('/courses/:cat',urlencodedParser, async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  const searchTerm = req.params.cat //variable
const regex =  new RegExp(searchTerm,'g'); // correct way
  try{
      const data = await courses.find({ category: regex });
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
  res.end()
})
router.get('/AllCourses',urlencodedParser, async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  const searchTerm = req.params.cat //variable
const regex =  new RegExp(searchTerm,'g'); // correct way
  try{
      const data = await courses.find();
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
  res.end()
})
router.get('/resources',urlencodedParser, async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  try{
      const data = await Resource.find();
      res.status(200).json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
  res.end()
})
router.get('/resources/:course',urlencodedParser, async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
const course=req.params.course;

  try{
      const data = await Resource.find({course:course});
      res.status(200).json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
  res.end()
})
router.get('/course/:id', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  try{
      const data = await courses.findById(req.params.id);
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.get('/search/:searchTerm', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const searchTerm = req.params.searchTerm //variable
const regex =  new RegExp(searchTerm,'g'); // correct way
  try{
      const data = await courses.find({ title: regex });
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.get('/carts/:user', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const user=req.params.user;
  try{
      const data = await Cart.find({user});
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.get('/learning/:user', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const user=req.params.user;
  try{
      const data = await Learning.find({user});
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})
//Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };

      const result = await Model.findByIdAndUpdate(
          id, updatedData, options
      )

      res.send(result)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})
router.post('/DelCourse', async (req, res) => {
  console.log("request sent")
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  try {
      const {id} = req.body;
      const data = await courses.findByIdAndDelete(id)
      res.send(`Document with ${data.title} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

router.post('/DelRes', async (req, res) => {
  console.log("request sent")
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  try {
      const {id} = req.body;
      const data = await Resource.findByIdAndDelete(id)
      res.send(`Document with ${data.title} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})
router.post('/CreateSub', async (req, res) => {
  console.log("request sent")
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const data = req.body.formData;
  data.forEach(obj => {
    const data = new Learning({
      user:obj.user,
      title: obj.title,
      subDate:obj.subDate
  })

  try {
      const dataToSave = data.save();
     // res.status(200).json(dataToSave)
      Cart.find({user:obj.user}).remove(()=>console.log("user removed"))
  }
  catch (error) {
    //  res.status(400).json({message: error.message})
  }
   console.log(obj.user)
   
});
res.send("yes")
})
router.post('/DelCart', async (req, res) => {
  console.log("request sent")
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  try {
      const {id} = req.body;
      console.log(id)
      const data = await Cart.findByIdAndDelete(id)
      res.send(`Document with ${data.title} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})
router.post('/DelLeraning', async (req, res) => {
  console.log("request sent")
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  try {
      const {id} = req.body;
      console.log(id)
      const data = await Learning.findByIdAndDelete(id)
      res.send(`Document with ${data.title} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
  
})
//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
  res.send('Delete by ID API')
})
router.post("/subscription", urlencodedParser,async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Our register logic starts here
   try {
    // Get user input
    const { fullname, category, course, startDate,startTime,instructor,email,password } = req.body;
console.log(req.body)
    // Validate user input
    if (!(email && password && fullname && course)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await subscription.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await subscription.create({
      fullname: fullname,
      category: category,
      course:course,
      startDate:startDate,
  startTime:startTime,
      instructor:instructor,
      email: email,
      password: encryptedUserPassword,
      token:""
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  res.end()
  // Our register logic ends here
});
let crypto = require("crypto");
let increment=0;
let id = crypto.randomBytes(16).toString("hex");
let imgurl=id+increment;
const multer =require("multer")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/')
  },
  filename: (req, file, cb) => {
    cb(null, id+increment+".jpg")
  },
})

const upload = multer({ storage: storage })
router.post("/addCourse",upload.single('file'),async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Our register logic starts here
   try {
    // Get user input
    const { title, category, desc, ratings,imgUrl,instructor,price} = req.body;
console.log(req.body)
    // Validate user input
    if (!(title && category && desc && ratings)) {
      res.status(400).send("All input is required");
    }

   
    // Create user in our database
    const course = await courses.create({
      title: title,
      category: category,
      desc:desc,
      instructor:instructor,
      ratings: ratings,
      price: price,
      imgUrl:id+increment
    });

   
    res.status(201).json(course);
  } catch (err) {
    console.log(err);
  }
  increment=increment+1;
 res.end()
 
  // Our register logic ends here
});
let resCount=0;

const Res_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/res/')
  },
  filename: (req, file, cb) => {
    cb(null, id+resCount+".mp4")
  },
})

const Res_upload = multer({ storage: Res_storage })
router.post("/addRes",Res_upload.single('file'),async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Our register logic starts here
   try {
    // Get user input
    const { title,desc,course} = req.body;
console.log(req.body)
    // Validate user input
    if (!(title && desc)) {
      res.status(400).send("All input is required");
    }

   
    // Create user in our database
    const res = await Resource.create({
      course: course, 
      title: title,  
      desc:desc,
      resUrl:id+resCount
    });

   
    res.status(201).json(course);
  } catch (err) {
    console.log(err);
  }
  resCount=resCount+1;
 res.end()
 
  // Our register logic ends here
});
router.post("/addCart", urlencodedParser,async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Our register logic starts here
   try {
    // Get user input
    const { user,title,totalPrice} = req.body;
console.log(req.body)
    // Validate user input
    if (!(user &&  totalPrice)) {
      res.status(400).send("All input is required");
    }

   
    // Create user in our database
    const cart = await Cart.create({
      user: user,
      title:title,
      totalPrice: totalPrice,
 
    });

   
    res.status(201).json(cart);
  } catch (err) {
    console.log(err);
  }
  res.end()
  // Our register logic ends here
});
router.post("/register", urlencodedParser,async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Our register logic starts here
   try {
    // Get user input
    const { firstname, lastname, email, password } = req.body;
console.log(req.body)
    // Validate user input
    if (!(email && password && firstname && lastname)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name: firstname,
      last_name: lastname,
      email: email, // sanitize
      password: encryptedUserPassword,
      token:""
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  res.end()
  // Our register logic ends here
});

router.post("/login",  urlencodedParser,async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Our login logic starts here
   try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await subscription.findOne({ email });
    console.log(user)
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      
      // save user token
      user.token = token;
   
   
      res.status(201).json({Token:token,user:user.email});
    }
    return res.status(400).send("Invalid Credentials");
    
  // Our login logic ends here
}
catch(error){}
});
module.exports=router;
router.get("/logout",(req,res)=>{
  res.clearCookie("token");
  res.end()
})
