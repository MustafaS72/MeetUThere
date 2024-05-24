const express=require('express')
const router=express.Router()
const User=require('../models/user')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const {v4:uuidv4}=require("uuid")
var jwt = require('jsonwebtoken');
const jwtSecret = "iamchannelsohowruguyzzkesehoapplogncdjnj"

router.post("/createuser", [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('name').isLength({ min: 3 })
],async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
  try {
    await User.create({
      name:req.body.name,
      //password:req.body.password,
      password: securePass,
      email:req.body.email,
      location:req.body.location
    })
    res.json({success:true})
  } catch (error) {
    console.log(error);
    res.json({success:false})
  }
})


router.post("/loginuser", [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
],async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
  let email=req.body.email
  try {
    let userData=await User.findOne({email})
    if(!userData){
      return res.status(400).json({errors:"Try logging in with correct credentials"})
    }
    const pwdCompare = await bcrypt.compare(req.body.password, userData.password); // this return true false.
    if (!pwdCompare) {
      return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
    }

    const data = {
      user: {
          id: userData.id
      }
  }
  const authToken = jwt.sign(data, jwtSecret);
    return res.json({success:true,authToken:authToken})
  } catch (error) {
    console.log(error);
    res.json({success:false})
  }
})

module.exports=router;