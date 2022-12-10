import { doc, collection, query, where, orderBy, onSnapshot, deleteDoc, setDoc, updateDoc } from 'firebase/firestore'
import { firebaseDB } from './firebase-config'
import { getAlarms } from './alert'

const createDeviceCollection = () => {
    return collection(firebaseDB, 'devices')
}

const createDeviceDoc = (deviceID) => {
    return doc(firebaseDB, 'devices', deviceID)
}

const getDevicesQuery = (userID) => {
    const q = query(collection(firebaseDB, 'devices'), where('userID', '==', userID), orderBy('favorite', 'desc'), orderBy('timestamp', 'desc'))
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
        const devices = snapshot.docs.map(doc => doc.data())
        devicesCallback(devices)
    })

    return unsubscribeDevices
}

const createDeviceListener = (deviceID, deviceCallback) => {
    const unsubscribeDevice = onSnapshot(getDeviceQuery(deviceID), (doc) => {
        deviceCallback(doc.data())
    })

    return unsubscribeDevice
}

const createDeviceDataListener = (deviceID, deviceDataCallback) => {
    const unsubscribeDevices = onSnapshot(getDeviceDataQuery(deviceID), (snapshot) => {
        const deviceData = snapshot.docs.map(doc => doc.data())
        deviceDataCallback(deviceData)
         
    })

    return unsubscribeDevices
}

const createDevice = async (deviceData) => {
    const deviceDocument = doc(createDeviceCollection())

    const deviceDataWithDeviceID = {...deviceData, id: deviceDocument._key.path.segments[1]}

    await setDoc(deviceDocument, deviceDataWithDeviceID)

    return deviceDocument._key.path.segments[1]
}

const updateDevice = async (deviceID, deviceData) => {
    const deviceDocument = createDeviceDoc(deviceID)

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
        await deleteDoc(doc(firebaseDB, 'devices', deviceID))
    } catch (error) {
        throw error
    }
}

const updateFavorite = async (deviceID, favorite) => {
    const deviceDocument = createDeviceDoc(deviceID)

    await updateDoc(deviceDocument, {
      favorite: favorite
    });
  }

const addDataToDevice = async (deviceID, data) => {
    const dataDocument = doc(collection(firebaseDB, 'device_data'))

    const dataWithDeviceID = {...data, deviceID: deviceID}

    await setDoc(dataDocument, dataWithDeviceID)

    return dataDocument._key.path.segments[1]
}

const getSharedDevicesQuery = (userID) => {
    const q = query(createDeviceCollection(), where('sharedWith', 'array-contains-any', [userID]))
    return q
}

const createSharedDeviceDataListener = (userID, sharedDeviceDataCallback) => {
    const unsubscribeDevices = onSnapshot(getSharedDevicesQuery(userID), (snapshot) => {
        const sharedDeviceData = snapshot.docs.map(doc => doc.data())
        sharedDeviceDataCallback(sharedDeviceData)
    })

    return unsubscribeDevices
}

const updateSharedDevices = async (deviceID, sharedWith) => {
    const deviceDocument = createDeviceDoc(deviceID)

    await updateDoc(deviceDocument, {
        sharedWith: sharedWith
    })
}

export { 
    createDeviceDoc,
    getDevicesQuery, 
    getDeviceQuery,
    getDeviceDataQuery, 
    createDevice, 
    updateDevice, 
    deleteDevice,
    updateFavorite,
    addDataToDevice,
    createDeviceListener, 
    createDevicesListener, 
    createDeviceDataListener,
    createSharedDeviceDataListener,
    updateSharedDevices
}
