import {create} from "zustand"
import axios from "axios"
import toast from "react-hot-toast"

axios.defaults.withCredentials = true
export const useUserstore = create((set)=>({
    user: null,
    isSingup : false,
    islogin : false,
    islogout : true,
    isAuth : false,
    isReset : false,
    isverify : false,

    singup : async (crenditial) =>{
        set({isSingup: true, islogin : true})
        try {
            const res = await axios.post("/api/user/singup", crenditial)
            set({isSingup: false, user : res.data.user})
            toast.success("Verification code send in your email")
        } catch (error) {
            set({isSingup: false, user : null})
            toast.error(error.response.data.message)
            console.log(error)
        }
    },
    login : async (crenditial) =>{
        set({islogin : true})
        try {
            const res = await axios.post("/api/user/login", crenditial)
            set({ user : res.data.user})
            toast.success("Login successfully")
        } catch (error) {
            set({islogin: false, user : null})
            toast.error(error.response.data.message)
            console.log(error)
        }
    },

    logout : async () =>{
        set({islogin : false})
        try {
            await axios.post("/api/user/logout")
            set({islogout: false, user : null})
            toast.success("Logout successfully")
        } catch (error) {
            console.log(error)
        }
    },

    verify : async (code) =>{
        set({isverify: true})
        try {
            const res = await axios.post("/api/user/authentication", code)
            set({isverify: false, user : res.data.user})
            toast.success("Verification successfully")
            return res.data.success
        } catch (error) {
            set({isverify: false, user : null})
            toast.error(error.response.data.message)
            console.log(error)
        }
    },

    check : async () =>{
        set({isAuth : true})
        try {
            const res = await axios.get("/api/user/check")
            set({isAuth : false, user : res.data.user})
        } catch (error) {
            set({isAuth : false, user : null})
            console.log(error)
        }
    },

    forget : async (email) =>{
        set({isReset : true})
        try {
            const res = await axios.post("/api/user/fogetpassword", email)
            toast.success("Reset password link send in your email")
            set({isReset : false})
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
    },

    reset : async (token, password) =>{
        console.log(token)
        try {
            const res = await axios.post(`/api/user/resetpassword/${token}`, {password})
            toast.success("Reset password successfully")
            set({isReset : false})
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

}))