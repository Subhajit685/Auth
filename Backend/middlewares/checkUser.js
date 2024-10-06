import jwt from "jsonwebtoken"

export const checkUser = async (req, res, next) =>{
    try {
        const token = req.cookies["jwt_token"]
        if(!token){
            return res.status(401).json({ success: false, message: "Token not found" })
        } 

        const user = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if(!user){
            return res.status(401).json({ success: false, message: "Invalid token" })
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
    
}