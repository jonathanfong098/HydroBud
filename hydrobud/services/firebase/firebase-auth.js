import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { collection, addDoc, doc, setDoc, getDoc, deleteDoc, onSnapshot, updateDoc, query , orderBy} from 'firebase/firestore'
import { firebaseAuth, firebaseDB } from './firebase-config'

const createUsersCollection = () => {
  return collection(firebaseDB, 'users')
}

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
      imageURI: 'https://hydrobud-images.s3.us-west-2.amazonaws.com/default_profile_picture.jpg'
    })
  } catch (error) {
    throw error
  }
}

const login = async (email, password) => {
    try {
      const test = await signInWithEmailAndPassword(firebaseAuth, email, password)
    } catch (error) {
      throw error
    }
}

const getUser = async (userID) => {
  const docRef = doc(firebaseDB, 'users', userID)

  const currentUser = await getDoc(docRef)

  if (currentUser) {
    return currentUser.data()
  } else {
    throw new Error('user does not exist ')
  }
}

const creteUserListener = (userID, userCallback) => {
    const unsubscribeUser = onSnapshot(createUserDoc(userID), (doc) => {
      userCallback(doc.data())
  })

  return unsubscribeUser
}

const getUsersQuery = () => {
  return query(createUsersCollection())
}

const createUsersListener = async (usersCallback) => {
  const unsubscribeUsers = onSnapshot(getUsersQuery(), (snapshot) => {
    const usersData = snapshot.docs.map(doc => {
      const data = doc.data()
      return {...data, id:doc._key.path.segments[6]}
    })
    usersCallback(usersData)
     
  })

  return unsubscribeUsers
}

const updateUser = async (userID, userData) => {
  const docRef = doc(firebaseDB, 'users', userID)

  await updateDoc(docRef, {
    username: userData.username,
    bio: userData.bio,
    imageURI: userData.imageURI
  })
}

const getNotificationsQuery = (userID) => {
  return query(collection(firebaseDB, 'users', userID, 'notifications'), orderBy('timestamp', 'desc'))
}

const createNotificationDoc = (userID, notificationID) => {
  return doc(firebaseDB, `users/${userID}/notifications/${notificationID}`)
}

const createNotificationsListener = async (userID, notificationsCallback) => {
  const unsubscribeNotifications = onSnapshot(getNotificationsQuery(userID), (snapshot) => {
    const notifications = snapshot.docs.map(doc => {
       const data = doc.data()
      return {...data, id: doc.id}
    }) 

    notificationsCallback(notifications)

    return unsubscribeNotifications
  })
}

const createNotification = async (userID, notificationData) => {
  const userDoc = createUserDoc(userID)
  const notificationCol = collection(userDoc, 'notifications')
  const notificationDoc = await addDoc(notificationCol, notificationData)

  return notificationDoc.id
}

const deleteNotification = async (userID, notificationID) => {
  try {
    const notificationDoc = createNotificationDoc(userID, notificationID)
    if (notificationDoc) {
      await deleteDoc(notificationDoc)
    }
  } catch (error) {
      throw error
  }
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
          deleteNotification,
          errorMessage,
          createUsersListener
        }