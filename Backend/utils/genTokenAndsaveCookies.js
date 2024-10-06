import JWT from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const genTokenAndSaveCookie = (id, res) =>{
    const token = JWT.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"})

    res.cookie("jwt_token", token, {
        maxAge: Date.now() + 24 * 60 * 60 * 1000,
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict",
    })

    return token
}