import { doc, collection, query, where, onSnapshot, deleteDoc, setDoc } from 'firebase/firestore'
import { firebaseDB } from './firebase-config'

const getDevicesQuery = (userID) => {
    const q = query(collection(firebaseDB, 'devices'), where('userID', '==', userID))
    return q
} 

const createDevicesListener = (userID, devicesCallback) => {
    const unsubscribeDevices = onSnapshot(getDevicesQuery(userID), (snapshot) => {
        // snapshot.docs.map(doc => console.log(doc.data()))
        const devices = snapshot.docs.map(doc => doc.data())
        devicesCallback(devices)

        // snapshot.docChanges().forEach((change) => {
        //     if (change.type === 'added') {
        //         console.log('New device: ', change.doc.data())
        //     }
        //     if (change.type === 'modified')s {
        //         console.log('Modified device: ', change.doc.data())
        //     }
        //     if (change.type === 'removed') {
        //         console.log('Removed device: ', change.doc.data())
        //     }
        //   })
    })

    return unsubscribeDevices
}

// const createDevice = async (deviceData) => {

// }


const createDevice = async (deviceData) => {
    // console.log('createDevice')
    const deviceDocument = doc(collection(firebaseDB, 'devices'))
    // console.log(deviceDocument)
    // console.log(deviceDocument._key.path.segments[1])

    const deviceDataWithDeviceID = {...deviceData, id: deviceDocument._key.path.segments[1]}
    // console.log(deviceDataWithDeviceID)

    await setDoc(deviceDocument, deviceDataWithDeviceID)
}

const deleteDevice = async (deviceID) => {
    try {
        console.log('Deleting Device')
        await deleteDoc(doc(firebaseDB, 'devices', deviceID))
    } catch (error) {
        throw error
    }
}

export { getDevicesQuery, createDevice, createDevicesListener, deleteDevice}
