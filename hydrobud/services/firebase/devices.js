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

const getDeviceDataQuery = (deviceID) => {
    const q = query(collection(firebaseDB, 'device_data'), where('deviceID', '==', deviceID), orderBy('timestamp', 'desc'))
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

const createDeviceDataListener = (deviceID, deviceDataCallback) => {
    const unsubscribeDevices = onSnapshot(getDeviceDataQuery(deviceID), (snapshot) => {
        // snapshot.docs.map(doc => console.log(doc.data()))
        const deviceData = snapshot.docs.map(doc => doc.data())
        console.log(deviceData)
        deviceDataCallback(deviceData)

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

const addDataToDevice = async (deviceID, data) => {
    const dataDocument = doc(collection(firebaseDB, 'device_data'))
    console.log(dataDocument)
    console.log(dataDocument._key.path.segments[1])

    const dataWithDeviceID = {...data, deviceID: deviceID}

    await setDoc(dataDocument, dataWithDeviceID)

    return dataDocument._key.path.segments[1]
}

export { 
    getDevicesQuery, 
    getDeviceQuery,
    getDeviceDataQuery, 
    createDevice, 
    updateDevice, 
    deleteDevice,
    addDataToDevice,
    createDeviceListener, 
    createDevicesListener, 
    createDeviceDataListener
}
