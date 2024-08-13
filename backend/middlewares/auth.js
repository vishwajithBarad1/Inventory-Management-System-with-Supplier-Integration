const jwt = require("jsonwebtoken")
const secretKey = process.env.secretKey

exports.protect = async (req,res,next)=>{
    try{
        const token = (req.headers.authorization);
        if(token){
            const response = await jwt.verify(token,secretKey);
            if(!response){
                return res.status(401).json({
                    success:false,
                    message : "token expired or invalid"
                })
            }else{
                next();
            }
        }else{
            return res.status(401).json({
                success:false,
                message : "please do login or signup for this action"
            })
        }
        }catch(error){
        res.status(500).json({
            success:false,
            message : error.message
        })
    }
}

exports.createToken = async (payload)=>{
    const token =  await jwt.sign(payload,secretKey,{ expiresIn: '24h' });
    return token
}
