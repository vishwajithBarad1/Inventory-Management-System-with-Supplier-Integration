const {userModel,checkPassword} = require('../models/userModel');
const {createToken} = require("../middlewares/auth")

exports.createUser = async (req,res)=>{
    try{
        const {name,password,role} = req.body;
        const token = await createToken({name,role});
        const newUser = new userModel({
            username:name,
            password,
            role
        })
        await newUser.save();

        res.status(201).json({
            success:true,
            message:"created successfully",
            token:token
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message : error.message
        })
    }
}

exports.loginUser = async (req,res)=>{
    try{
        const {name,password,role}= req.body;
        if(await checkPassword(name,password)){
            const token = await createToken({name,role});
            res.status(200).json({
                success:true,
                message:"login successfull",
                token:token
            })
        }else{
            res.status(401).json({
                success:false,
                message:"username or password is incorrect"
            })
        }
    }catch(error){
        res.status(500).json({
            success:false,
            message : error.message
        })
    }
}