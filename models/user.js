import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required:[true,"Name is required!"]
    },
    email:{
        type: String,
        lowercase: true,
        required: [true, "Email is required!"],
        unique: [true, "Email already exists!"]
    },
    password:{
        type: String,
        required: [true, "Password is required!"]
    }
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;