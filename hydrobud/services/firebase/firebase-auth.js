import { firebaseAuth } from "./firebase-config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const signup = async (email, password) => {
    console.log("Signing Up")
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
  }

const login = async (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
  }

const logout = () => {
    return firebaseAuth.signOut()
}

const resetPassword = (email) => {
    return sendPasswordResetEmail(firebaseAuth, email)
}

const errorMessage = (error) => {
  switch(error){
    case 'auth/user-not-found':
      return 'Email does not exist'
    case 'auth/wrong-password':
      return 'Password is incorrect'
    case 'auth/invalid-email':
      return 'Email is invalid'
    case 'auth/missing-email':
      return 'Email is missing'
    default:
      return 'Error completing request'
  }
}

export { signup, login, logout, resetPassword, errorMessage }