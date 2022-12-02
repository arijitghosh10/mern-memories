import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async(req,res) =>{
    const { email,password } = req.body;
    try {
        const currUser = await User.findOne({ email });
        if(!currUser) return res.status(404).json({ message:'User does not exist.'});
        const isCorrectPassword = await bcrypt.compare(password,currUser.password);
        if(!isCorrectPassword) return res.status(400).json({ message:'Invalid password' });
        const token = jwt.sign({ email:currUser.email,id:currUser._id }, '@rijit' , { expiresIn:'1hr' });
        res.status(200).json({ result:currUser, token });
    } catch (error) {
        res.status(500).json({ message:'Something went wrong'});
    }
}
export const signup = async(req,res) =>{
    const { email,password,confirmPassword,firstName,lastName } = req.body;
    try {
        const currUser = await User.findOne({ email });
        if(currUser) return res.status(400).json({ message:'User Already Exists' });
        if(password.length < 5) return res.status(400).json({ message:'Password too short' });
        if(password !== confirmPassword) return res.status(400).json({ message:'Passwords do not match' });
        const hashedPwd = await bcrypt.hash(password,12);
        const resUser = await User.create({ email,password:hashedPwd,name:`${firstName} ${lastName}` });
        const token = jwt.sign({ email:resUser.email,id:resUser._id }, '@rijit', { expiresIn:'1hr' });
        res.status(200).json({ result:resUser, token })
    } catch (error) {
        res.status(500).json({ message:'Something went wrong'});
    }
}