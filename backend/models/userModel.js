const {mongoose} = require("../db/connectDB");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
        username:{
            type:String,
            require:true,
            unique: true
        },
        password:{
            type:String,
            require:true
        },
        role:{
            type:String,
            require:true,
            enum:["Admin","user"],
            default:"user"
        }
    }
)
const hashPassword = async function(){
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password,salt);
    this.password = hashPassword;
}
userSchema.pre("save",hashPassword);

const userModel = mongoose.model("User",userSchema);

const checkPassword = async function (name,pswd){
    const user = await userModel.find({username:name});
    if(!user){
        return false;
    }else{
        return await bcrypt.compare(pswd,user[0].password);
    }
}
module.exports = {userModel,checkPassword}