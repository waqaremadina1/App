import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase'

export default function Navbar() {

    const { isAuthenticated, dispatch, user } = useAuthContext()


    const handleLogout = (e) => {
        e.preventDefault()

        signOut(auth).then(() => {
            dispatch({ type: "LOGOUT" })

        })
            .catch((error) => {
                window.toastify("Something went wrong while logging out","success")
                // An error happened.
                window.toastify("Something went wrong while logging out", "error")
            });
    }

    return (


        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark ">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="offcanvas offcanvas-start bg-dark" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title text-white" id="offcanvasNavbarLabel">Home</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                        </div>
                        <div className="offcanvas-body ">
                            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">

                                <li className="nav-item">
                                    {!isAuthenticated ? Navigate("/") : <Link to="/read" className="nav-link" >All Events</Link>}
                                </li>

                                <li className="nav-item">
                                    {!isAuthenticated ? Navigate("/") : <Link to="/add" className="nav-link" >Add Event</Link>}
                                </li>

                                <li className="nav-item">
                                    {!isAuthenticated ? Navigate("/") : <Link to="/edit" className="nav-link" >Edit Event</Link>}
                                </li>
                                
                            
                                
                            </ul>
                            <div className="d-flex">
                                {!isAuthenticated 
                                    ? <Link to="/authentication/login" className="btn btn-success text-white" style={{fontWeight: 'bolder'}}>Login</Link>
                                    : <>
                                        <h5 className='text-white me-0 mb-0 me-4 mt-2'>{user.email}</h5>
                                        <Link to="/dashboard" className="btn btn-success fs-6  me-2 mb-0  stext-white text-white" style={{fontWeight: 'bolder'}} >Dasboard</Link>
                                        <button className="btn btn-danger  btn-sm text-white " style={{fontWeight: 'bolder'}} onClick={handleLogout} >Logout</button>
                                    </>
                                }
                                          
                            </div>         &ensp;
                            <div className="d-flex">
                                {!isAuthenticated 
                                    ? <Link to="/authentication/register" className="btn btn-danger text-white" style={{fontWeight: 'bolder'}}>Register</Link>
                                    : <>
                                    </>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </nav>


        </>
    )
}
