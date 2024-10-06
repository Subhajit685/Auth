import React, {useState} from 'react'
import { useUserstore } from '../store/user'
import { Link } from 'react-router-dom'
export default function Login() {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const {login} = useUserstore()

    const hendlesubmit = (e) =>{
        e.preventDefault()
        login({ email, password})
    }
  return (
    <div className='container my-5'>
            <form onSubmit={hendlesubmit}>
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
            <div className='container my-4 d-flex'>
               Don't have a account ? <Link  to={"/singup"}> Sing Up</Link>
               <Link className='mx-5' to={"/forget"}>forget password</Link>
            </div>
            </div>
  )
}
