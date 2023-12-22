import User from "@/models/user";
import connectToDB from "@/utils/database";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    const { email, password } = await req.json();
    try {
        await connectToDB();
        
        const user = await User.findOne({email});
        if(user){

            const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);

            if(user.email === email && originalText === password){
                var token = jwt.sign({name: user.name, email: email}, process.env.JWT_SECRET, { expiresIn: "7d"});
                return NextResponse.json({token, user:user},{status:200})
            }
            else{
                return NextResponse.json({message:"Invalid credentials"}, {status:400})
            }
        }
        else{
            return NextResponse.json({message:"No user found!"}, {status:404})
        }
    } catch (error) {
        return NextResponse.json({message:"Cannot find user!"}, {status:500})
    }
}