import React, { useState } from 'react'
import { useUserstore } from '../store/user'
import { useNavigate } from 'react-router-dom'

export default function Verify() {
    const {verify} = useUserstore()
    const navigate = useNavigate()
    const [code, setcode] = useState("")
    const hendlesubmit = (e) =>{
        e.preventDefault()
        console.log(code)
       const data = verify({code})
       if(data){
           navigate("/")
       }
    }
    return (
        <div className='container'>
            <form onSubmit={hendlesubmit}>
                    <label htmlFor="code" className="form-label">Verification Code</label>
                    <input type="text" className="form-control" id="code" name='code' value={code} onChange={(e) => setcode(e.target.value)} />
                    <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
  )
}
