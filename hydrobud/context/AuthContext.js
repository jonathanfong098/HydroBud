import React, { useContext, createContext, useState, useEffect } from "react"

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../services/firebase/firebase-config"

const DefaultAuthContext = {
    currentUser: null
}

const AuthContext = createContext(DefaultAuthContext)

const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, user => {
          setCurrentUser(user)
          setLoading(false)
        })
    
        return unsubscribe
      }, [])

    const authContext = { 
        currentUser: currentUser
    }

    return(
        <AuthContext.Provider value={authContext}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export { useAuthContext }
export default AuthProvider