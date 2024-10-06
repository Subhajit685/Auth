import React, { useState } from 'react'
import { useUserstore } from '../store/user'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Forget() {
    const navigate = useNavigate()

    const {forget} = useUserstore()
    const [email, setemail] = useState("")

    const hendlesubmit = (e) =>{
        e.preventDefault()
        forget({email})
        navigate("/")
    }
    return (
        <>
            <div className='container my-5'>
                <h1>Enter your email for reset your password</h1>
                <form onSubmit={hendlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name='email' value={email} onChange={(e) => setemail(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>
            </div>
        </>
    )
}
