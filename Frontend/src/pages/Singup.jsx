import React, { useState } from 'react'
import { useUserstore } from '../store/user'
import { Link, useNavigate } from 'react-router-dom'


export default function Singup() {

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const navigate = useNavigate()

    const {singup} = useUserstore()

    const hendlesubmit = (e) =>{
        e.preventDefault()
        singup({name, email, password})
        navigate("/verify")
    }
    return (
        <>
        <div className='container my-5'>
            <form onSubmit={hendlesubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={name} onChange={(e)=> setname(e.target.value)}/>

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' value={email} onChange={(e)=> setemail(e.target.value)}/>

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={password} onChange={(e)=> setpassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className='container my-4'>
                Allready have a account ? <Link to={"/login"}>Login</Link>
            </div>
            </div>
        </>
    )
}
