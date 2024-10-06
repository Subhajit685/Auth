import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

export const conntecteddb = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("connected")
    } catch (error) {
        process.exit(1)
    }
}