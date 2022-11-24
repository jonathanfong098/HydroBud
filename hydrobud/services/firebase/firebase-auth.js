import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { collection, addDoc, doc, setDoc } from "firebase/firestore"
import { firebaseAuth, firebaseDB } from "./firebase-config"


// const signup = async (email, password) => {
//     // console.log("Signing Up")

//     return createUserWithEmailAndPassword(firebaseAuth, email, password)
// }

const signup = async (email, username, password) => {

  try {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
  
    try {
      await setDoc(doc(firebaseDB, 'users', firebaseAuth.currentUser.uid), {
        email: email,
        username: username
      })
    } catch (error) {
      console.log('Something went wrong with added user to firestore: ', error)
    }
    
  } catch (error) {
    console.log('Something went wrong with sign up: ', error);
  }
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