import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import Login from '../pages/Authentication/Login'
import { Navigate } from 'react-router-dom'

export default function PrivatRoute(props) {

  const {isAuthenticated}  = useAuthContext()

    console.log("isAuthenticated", isAuthenticated)

    const { Component } = props
    if (!isAuthenticated)
        return <Navigate to="/authentication/login" />

    return (

        <Component />
    )
}
