import { firebaseAuth } from "./firebase-config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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
    return auth.sendPasswordResetEmail(email)
}

export { signup, login, logout, resetPassword }