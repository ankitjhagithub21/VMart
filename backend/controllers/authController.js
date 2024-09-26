const User = require("../models/user");
const validator = require("validator")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateTokenAndSetCookie = (userId,res) =>{
    
    const token = jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie('token',token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:1*24*60*60*1000
    })

}

const register = async(req,res) =>{
    try{
        const {fullName,email,password} = req.body;
       

        if(!fullName || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }

        if(fullName.trim().length <3){
            return res.status(400).json({
                success:false,
                message:"Name is less than 3 characters."
            })
        }

        const existingEmail = await User.findOne({email})

        

        if(existingEmail){
            return res.status(400).json({
                success:false,
                message:"Email already exist."
            })
        }

        //email validation
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success:false,
                message:"Please enter valid email address."
            })
        }

        //password validation

        if(!validator.isStrongPassword(password)){
            return res.status(400).json({
                success:false,
                message:"Please enter strong password."
            })
        }

        //hash password

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        await newUser.save()

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)

        }

       

        res.status(201).json({
            success:true,
            message:"Account created."
        })


    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const login = async(req,res) =>{
    try{

        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found."
            })
        }

        const comparePassword = await bcrypt.compare(password,user.password)

        if(!comparePassword){
            return res.status(400).json({
                success:false,
                message:"Wrong email or password."
            })
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            success:true,
            message:`Welcome back ${user.fullName}`
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const logout = async(req,res) =>{
    try{
        res.cookie('token','',{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:0
        }).status(200).json({
            success:true,
            message:"Logout successfull."
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getUser = async(req,res) =>{
    try{

        const user = await User.findById(req.userId).select("-password")

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found."
            })
        }

        res.status(200).json({
            success:true,
            user
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
    register,
    login,
    logout,
    getUser
}