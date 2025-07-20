import User from '../models/User.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
const registerUser =  async (req,res) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({success:false, error:errors.array()});
     }
    const {name,email,password} = req.body;
    try {
         const exists = await User.findOne({email});
         if(exists){
                return res.status(409).json({message: 'User already exists'});
         } else {
             const user = await User.create({name,email,password});
             res.status(201).json({success:true, name: user.name, email: user.email, user_id: user._id});
         }
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false, error:errors.array()});
    }
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const match = await user.comparePassword(password);
        if(!match){
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.status(200).json({success: true, token, user_id: user._id});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

export { registerUser, loginUser };