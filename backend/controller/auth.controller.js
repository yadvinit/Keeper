import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

export const signup = async(req,res,next)=>{

    const {username,email,password}= req.body

    const isValidUser= await User.findOne({email:email})

    if(isValidUser){
        return next(errorHandler(400,"User already exists"))
    }

    const hashedPassword = bcryptjs.hashSync(password,5)

    const newUser = new User({
        username,
        email,
        password:hashedPassword
    })
    try {
        await newUser.save()

        res.status(200).json({
            success:true,
            message:"user created successfully"
        })
        
    } catch (error){
        next(error)
        
    }

}

export const login= async (req,res,next)=>{

    const {email,password}= req.body
    
    try {
        const validUser = await User.findOne({email:email})

        if(!validUser){
            return next(errorHandler(404,"Not a valid user"))
        }
       
        const validPass = bcryptjs.compareSync(password,validUser.password)

        if(!validPass){
            return next(errorHandler(404,"Incorrect Password"))
        }

        const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET)

        const {password:pass,...rest} = validUser._doc
        res.cookie("access_token",token,{httpOnly:true}).status(200).json({
            success:true,
            message:"Login successful",
            rest,
        })

    } catch (error) {
        next(error)
    }
    
    

}

export const logout = async(req,res,next)=>{

    try {

        res.clearCookie("access_token")

        res.status(200).json({
            success:true,
            message:"Logout successful"
        })
        
    } catch (error) {
        next(error)
        
    }
}