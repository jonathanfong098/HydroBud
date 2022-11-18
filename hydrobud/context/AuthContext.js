import React, { useContext, createContext, useState, useEffect } from "react"

import { firebaseAuth } from "../services/firebase/firebase-config"
import { onAuthStateChanged } from "firebase/auth";


const AuthContext = createContext()

const useAuth = () => {
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

export { useAuth }
export default AuthProvider