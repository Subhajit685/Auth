import express from "express"
import dotenv from "dotenv"
import { conntecteddb } from "./db/connectdb.js";
import userRoute from "./routes/user.route.js"
import cookieParser from "cookie-parser";
import User from "./models/user.modle.js";




dotenv.config()
const app = express()
const PORT = process.env.PORT;


app.use(express.json())
app.use(cookieParser())


app.use("/api/user", userRoute)

app.get("/", async (req, res) =>{
    try {
        await User.bulk.find({isVerify: false}).delete()
    } catch (error) {
        
    }
})

app.listen(PORT, ()=>{
    conntecteddb()
    console.log("Server listen at ", PORT)
})