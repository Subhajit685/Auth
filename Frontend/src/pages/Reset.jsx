import React, { useState } from 'react'
import { useUserstore } from '../store/user'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function Reset() {
    const {token} = useParams()
    const [password, setpassword] = useState("")
    const {reset} = useUserstore()
    const navigate = useNavigate()
    const hendlesubmit = (e) =>{
        e.preventDefault()
        console.log(token)
        reset(token, password)
        navigate("/login")
    }
  return (
    <div>
        <div className='container my-5'>
                <h1>Enter new password</h1>
                <form onSubmit={hendlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New password</label>
                        <input type="password" className="form-control" id="password" name='password' value={password} onChange={(e) => setpassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>
            </div>
    </div>
  )
}
