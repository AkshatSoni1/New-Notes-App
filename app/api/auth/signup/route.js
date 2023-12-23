import connectToDB from "@/utils/database";
import User from "@/models/user";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { name, email, password } = await req.json()
    try {
        await connectToDB();

        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({message:"Email already exists!"}, {status:400})
        }
        const newUser = new User({
            name,
            email,
            password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()
        })

        await newUser.save();

        return new Response(JSON.stringify(newUser), {status:200})

    } catch (error) {
        return NextResponse.json({message:"Cannot sign up!"}, {status:500})
    }
}
