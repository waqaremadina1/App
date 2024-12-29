import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { auth } from '../config/firebase'

export const Auth = createContext()
const initialState = { isAuthenticated: false, user: {} }

const reducer = ((state, { type, payload }) => {
    switch (type) {
        case "LOGIN":
            return { isAuthenticated: true, user: payload.user }
        case "LOGOUT":
            return { ...initialState }
        default:
            return state
    }
})

export default function AuthContext({ children }) {

    const [isAppLoader, setIsAppLoader] = useState(false)

    useEffect(() => {
        setIsAppLoader(true)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // window.toastify("user is signed in", "success")
                dispatch({ type: "LOGIN", payload: { user } })
            } else {
                dispatch({ type: "LOGOUT" })

                window.toastify("user is signed out", "error")
            }
            setIsAppLoader(false)
        });
    }, [auth])
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <Auth.Provider value={{ ...state, dispatch, isAppLoader, setIsAppLoader }}>
            {children}
        </Auth.Provider>
    )
}








export const useAuthContext = () => useContext(Auth)
