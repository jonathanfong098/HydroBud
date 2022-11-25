import React, { useContext, createContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { firebaseAuth } from '../services/firebase/firebase-config'

const DefaultAuthContext = {
    currentUser: null,
    setCurrentUser: () => {},
    initializing: true
}

const AuthContext = createContext(DefaultAuthContext)

const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    const [initializing, setInitializing] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, user => {
          setCurrentUser(user)
          setInitializing(false)
        })
    
        return unsubscribe
      }, [])

    const authContext = { 
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        initializing: initializing
    }

    return(
        <AuthContext.Provider value={authContext}>
            {!initializing && children}
        </AuthContext.Provider>
    )
}

export { useAuthContext }
export default AuthProvider