import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    refreshToken:{
        type:String
    }
})

const User = mongoose.model("User",userSchema)

export {
    User
}