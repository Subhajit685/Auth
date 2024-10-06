import express from 'express'
import User from '../models/user.modle.js'
import { genTokenAndSaveCookie } from '../utils/genTokenAndsaveCookies.js'
import { forgetpassword, resetsuccess, sendVerificationCode, successLogin, welcomeSingup } from '../mailtrap/email.js'
import bycript from "bcryptjs"
import { checkUser } from '../middlewares/checkUser.js'

const route = express.Router()

route.post("/singup", async (req, res) => {

    const { name, email, password } = req.body

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fildes require" })
        }

        if (password.length < 8) {

            return res.status(400).json({ success: false, message: "Password must have 8 character" })
        }

        const validemail = await User.findOne({ email })

        if (validemail) {
            return res.status(400).json({ success: false, message: "Email allready exite" })
        }

        const salt = await bycript.genSalt(10)
        const hasPassword = await bycript.hash(password, salt)

        const authinticationCode = Math.floor(Math.random() * 1000000).toString()
        const newuser = await User({
            name,
            email,
            password: hasPassword,
            authinticationCode,
            authinticationCodeCreatedAt: Date.now() + 60 * 60 * 1000,
        })

        genTokenAndSaveCookie(newuser._id, res)

        await newuser.save()

        await sendVerificationCode(newuser.email, authinticationCode)

        return res.status(200).json({
            success: true,
            user: {
                ...newuser._doc,
                password: null
            }
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }

})

route.post("/authentication", async (req, res) => {
    const { code } = req.body
    try {
        const user = await User.findOne({
            authinticationCode: code,
            authinticationCodeCreatedAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid code or expire code" })
        }

        user.authinticationCode = undefined
        user.isVerify = true
        await user.save()

        await welcomeSingup(user.email, user.name)

        return res.status(200).json({
            success: true, user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})
route.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fildes require" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const validuser = await bycript.compare(password, user.password)

        if (!validuser) {
            return res.status(400).json({ success: false, message: "Invalid creanditials" })
        }

        genTokenAndSaveCookie(user._id, res)
        await successLogin(email, user.name)

        return res.status(200).json({
            success: true, user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})
route.post("/logout", async (req, res) => {
    try {
        return res.clearCookie("jwt_token").json({ success: true, message: "Logout successfully" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})

route.post("/fogetpassword", async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const token = Math.floor(Math.random() * 10000000000).toString()
        user.forgetPasswordToken = token
        user.forgetPasswordCreatedAt = Date.now() + 60 * 60 * 1000;

        await user.save()

        await forgetpassword(email, `${process.env.URL}/resetpassword/${token}`)

        return res.status(200).json({ success: true, message: "email send", token: token })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})

route.post("/resetpassword/:token", async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    try {
        const valid = await User.findOne({
            forgetPasswordToken: token,
            forgetPasswordCreatedAt: { $gt: Date.now() }
        })

        if (!valid) {
            return res.status(400).json({ success: false, message: "Invalid token or token expired" })
        }

        const hasPassword = await bycript.hash(password, 10)
        valid.password = hasPassword,
            valid.forgetPasswordToken = undefined,
            valid.forgetPasswordCreatedAt = undefined

        await valid.save()

        await resetsuccess(valid.email)

        return res.status(200).json({ success: true, message: "password reset successfully" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})

route.get("/check", checkUser, async (req, res) => {
    try {
        const user = await User.findById({ _id: req.user.id }).select("-password")
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        return res.status(200).json(({ success: true, user: user }))
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})

export default route


