import express from "express"
import dotenv from "dotenv"
import { conntecteddb } from "./db/connectdb.js";
import userRoute from "./routes/user.route.js"
import cookieParser from "cookie-parser";
import User from "./models/user.modle.js";
import path from "path"




dotenv.config()
const app = express()
const PORT = process.env.PORT;


app.use(express.json())
app.use(cookieParser())


app.use("/api/user", userRoute)

app.get("/", async (req, res) =>{
    try {
        await User.bulk.find({isVerify: false}).delete()
        return res.join({seccess : true})
    } catch (error) {
        
    }
})

const __dirname = path.resolve()


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/Frontend/dist")))

    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"))
    })
}

app.listen(PORT, ()=>{
    conntecteddb()
    console.log("Server listen at ", PORT)
})