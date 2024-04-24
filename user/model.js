import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    profile : {
        type : String,
        default : "http://cdn.onlinewebfonts.com/svg/img_206976.png"
    },
    joining : {
        type : Date,
        default : Date.now
    }
})

const userModel = model("user", userSchema)
export default userModel