import React, { useContext, createContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { firebaseAuth } from '../services/firebase/firebase-config'
import { creteUserListener } from '../services/firebase/firebase-auth'
import { objectIsEmpty } from '../utils/helper'

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
    const [currentUserData, setCurrentUserData] = useState({})
    const [initializing, setInitializing] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, user => {
          setCurrentUser(user)
          setInitializing(false)
        })

        return unsubscribe
      }, [])

    useEffect(() => {
        if (currentUser){
            if (!objectIsEmpty(currentUser)){
                const unsubscribeUser = creteUserListener(currentUser.uid, setCurrentUserData)
            } else {
                setCurrentUserData({})
            }
        }
    }, [currentUser])

    const authContext = { 
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        currentUserData: currentUserData,
        setCurrentUserData: setCurrentUserData,
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