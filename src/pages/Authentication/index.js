import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Topbar from '../../components/Header/Topbar';

export default function index() {
    return (
        <>
            <Topbar />
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
        </>
    )
}
