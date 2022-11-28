import { doc, collection, query, where, orderBy, onSnapshot, deleteDoc, setDoc, updateDoc } from 'firebase/firestore'
import { firebaseDB } from './firebase-config'

const getDevicesQuery = (userID) => {
    const q = query(collection(firebaseDB, 'devices'), where('userID', '==', userID), orderBy('timestamp', 'desc'))
    // const q = query(collection(firebaseDB, 'devices'), where('userID', '==', userID))
    return q
} 

const getDeviceQuery = (deviceID) => {
    const q = query(doc(firebaseDB, 'devices', deviceID))
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

const createDeviceListener = (deviceID, deviceCallback) => {
    const unsubscribeDevice = onSnapshot(getDeviceQuery(deviceID), (doc) => {
        console.log("Current data: ", doc.data())
        deviceCallback(doc.data())
    })

    return unsubscribeDevice
}

const createDevice = async (deviceData) => {
    // console.log('createDevice')
    const deviceDocument = doc(collection(firebaseDB, 'devices'))
    // console.log(deviceDocument)
    // console.log(deviceDocument._key.path.segments[1])

    const deviceDataWithDeviceID = {...deviceData, id: deviceDocument._key.path.segments[1]}
    // console.log(deviceDataWithDeviceID)

    await setDoc(deviceDocument, deviceDataWithDeviceID)

    return deviceDocument._key.path.segments[1]
}

const updateDevice = async (deviceID, deviceData) => {
    console.log('updateDevice')
    const deviceDocument = doc(firebaseDB, 'devices', deviceID)
    console.log(deviceDocument)
    // console.log(deviceDataWithDeviceID)

    await updateDoc(deviceDocument, {
        name: deviceData.name,
        monitor: deviceData.monitor,
        description: deviceData.description,
        imageURI: deviceData.imageURI,
        metrics: deviceData.metrics
    })
}

const deleteDevice = async (deviceID) => {
    try {
        console.log('Deleting Device')
        await deleteDoc(doc(firebaseDB, 'devices', deviceID))
    } catch (error) {
        throw error
    }
}

export { getDevicesQuery, getDeviceQuery, createDevice, updateDevice, createDeviceListener, createDevicesListener, deleteDevice}
