import {Navigate, Route, Routes} from "react-router-dom"
import Singup from "./pages/Singup"
import Login from "./pages/Login"
import Verify from "./pages/Verify"
import { useUserstore } from "./store/user"
import { useEffect } from "react"
import Forget from "./pages/Forget"
import Reset from "./pages/Reset"
import {Toaster} from "react-hot-toast"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"

function App() {

  const {check, user} = useUserstore()

  useEffect(()=>{
    check()
  },[check])
  
  console.log(user)


  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/singup" element={!user ? <Singup/> : <Navigate to={"/"}/>}/>
        <Route path="/login" element={!user ? <Login/> : <Navigate to={"/"}/>}/>
        <Route path="/verify" element={ <Verify/> }/>
        <Route path="/forget" element={!user ? <Forget/> : <Navigate to={"/"}/>}/>
        <Route path="/resetpassword/:token" element={!user ? <Reset/> : <Navigate to={"/"}/>}/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
