const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config()
const userRouter = express.Router();

userRouter.get("/",async (req,res)=>{
    try{
        const users = await UserModel.find()
        res.status(200).json({msg:"User Data", user:users})   
         }catch(err){
          res.status(500).json({msg:err.message})
      }
})


userRouter.post("/signup", async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    try {
        let userExist = await UserModel.findOne({ email });
        
        if (userExist) {
            return res.status(200).json({ msg: "Email already exists. Please login or sign up with another email." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Passwords do not match." });
        }

        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(400).json({ msg: err.message });
            } else {
                const user = new UserModel({ email, password: hash });
                await user.save();
                return res.status(200).json({ msg: "New user registered, Please login to continue!" });
            }
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

userRouter.post("/login",async(req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password,(err,result)=>{
                if(result){
                    var token = jwt.sign({userID:user._id,user:user.firstName}, process.env.secret)
                    res.status(200).json({msg:"Logged In!", token})
                }else{
                    res.status(200).json({msg:"Wrong Credentials",result})
                }
            })
        }else{
            res.status(200).json({msg:"User does  not exist"})
        }
    }catch(err){
        res.status(500).json({msg:err.message})
    }
})


userRouter.post("/logout", (req, res) => {
     res.clearCookie("token");
    res.json({ msg: "Logged out successfully" });
  });

module.exports={
    userRouter
} 