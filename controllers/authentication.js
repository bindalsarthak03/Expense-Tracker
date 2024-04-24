const UserSchema = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
require('dotenv').config();
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await UserSchema.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = UserSchema({
            name, email, password:hashedPassword
        })
        await user.save();
        res.status(200).json({ message: 'New user added!' })
    } catch (error) {
        res.status(500).json(error);
    }

}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserSchema.findOne({ email: email})
        if (!user) {
            res.status(400).json({ message: 'User Does Not Exist!' })
        }
        const passwordMatch =  await bcrypt.compare(password,user.password);

        console.log(passwordMatch)
        if (passwordMatch==false) {
            res.status(400).json({message:'Incorrect Password'})
        }else{
            const token = jwt.sign({
                userId:user._id
            },process.env.ACCESS_TOKEN_SECRET)
            // res.status(200).header('auth-token',token).json({message:'User Logged in!'})
            await res.cookie('token', token,{expire:new Date()+1})
            res.status(200).json({message:`User ${email} logged in!`})
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
}

exports.signout = (req,res) =>{
    try{
    res.clearCookie("token")
    res.status(200).json({message:'success'});}catch(err){
        res.status(501).send(err);
    }
}

