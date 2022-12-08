import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { collection, addDoc, doc, setDoc, getDoc, onSnapshot, updateDoc, query , orderBy} from 'firebase/firestore'
import { firebaseAuth, firebaseDB } from './firebase-config'

const createUserDoc = (userID) => {
  return doc(firebaseDB, 'users', userID)
}

const signup = async (email, username, password) => {
  try {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
    await setDoc(doc(firebaseDB, 'users', firebaseAuth.currentUser.uid), {
      email: email,
      username: username,
      bio: '',
      imageURI: 'https://hydrobud-media.s3.us-west-2.amazonaws.com/default_profile_picture.jpg'
    })
  } catch (error) {
    throw error
  }
}

const login = async (email, password) => {
    try {
      const test = await signInWithEmailAndPassword(firebaseAuth, email, password)
      console.log(test)
    } catch (error) {
      throw error
    }
}

const getUser = async (userID) => {
  // console.log('userID', userID)
  const docRef = doc(firebaseDB, 'users', userID)

  const currentUser = await getDoc(docRef)

  if (currentUser) {
    console.log('user data', currentUser.data())
    return currentUser.data()
  } else {
    throw new Error('user does not exist ')
  }
}

const creteUserListener = (userID, userCallback) => {
    const unsubscribeUser = onSnapshot(doc(firebaseDB, 'users', userID), (doc) => {
      console.log("Current data: ", doc.data());
      userCallback(doc.data())
  });

  return unsubscribeUser
}

const updateUser = async (userID, userData) => {
  const docRef = doc(firebaseDB, 'users', userID)

  console.log('userData: firebase-auth', userData)

  await updateDoc(docRef, {
    username: userData.username,
    bio: userData.bio,
    imageURI: userData.imageURI
  })
}

const getNotificationsQuery = (userID) => {
  const q = query(collection(firebaseDB, 'users', userID, 'notifications'), orderBy('timestamp', 'desc'))
  return q
}

const createNotificationsListener = async (userID, notificationsCallback) => {
  const unsubscribeNotifications = onSnapshot(getNotificationsQuery(userID), (snapshot) => {
    const notifications = snapshot.docs.map(doc => {
      // console.log('message: ', doc)
      //  console.log('message id: ', doc.id)
       const data = doc.data()
      return {...data, id: doc.id}
    }) 
    console.log('notifications: ', notifications)

    notificationsCallback(notifications)

    return unsubscribeNotifications
  })
}

const createNotification = async (userID, notificationData) => {
  console.log('notificationData', notificationData)
  const userDoc = createUserDoc(userID)
  const notificationCol = collection(userDoc, 'notifications')
  // await addDoc(alertCol, alertData)
  const notificationDoc = await addDoc(notificationCol, notificationData)

  return notificationDoc.id
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
    case 'auth/email-already-in-use':
      return 'Email already in use'
    default:
      return 'Error completing request'
  }
}

export { 
          createUserDoc,
          signup, 
          login, 
          logout, 
          resetPassword, 
          getUser, 
          creteUserListener, 
          updateUser,
          createNotificationsListener,
          createNotification,
          errorMessage
        }