import mongoose from "mongoose";

let connected = false;

const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    
    if(connected){
        console.log("Already Connected To DB")
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"notes-application"
        });
        connected=true;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error)
    }
        
} 

export default connectToDB;