import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required :true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    authinticationCode : {
        type: String,
    },
    isVerify :{
        type : Boolean,
        default : false,
    },
    authinticationCodeCreatedAt : Date,
    forgetPasswordToken : String,
    forgetPasswordCreatedAt : Date,
})

const User = mongoose.model("User", userSchema)

export default User