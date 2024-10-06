import React from 'react'
import { useUserstore } from '../store/user'

export default function Navbar() {
    const {logout, islogin, user} = useUserstore()
    const hendleClick = (e) =>{
        e.preventDefault()
        logout()
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Authentication</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>

                            {user ? <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/logout" onClick={hendleClick}>Logout</a>
                            </li>
                                : <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/singup">Sing Up</a>
                                </li>}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
