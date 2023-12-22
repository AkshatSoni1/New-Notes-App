import connectToDB from "@/utils/database";
import User from "@/models/user";
import CryptoJS from "crypto-js";

export const POST = async (req) => {
    const { name, email, password } = await req.json()
    try {
        await connectToDB();

        const user = await User.findOne({email});
        if(user){
            return new Response("Email already exists!", {status:400})
        }
        const newUser = new User({
            name,
            email,
            password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()
        })

        await newUser.save();

        return new Response(JSON.stringify(newUser), {status:200})

    } catch (error) {
        return new Response("Cannot create user!", {status:500})
    }
}
