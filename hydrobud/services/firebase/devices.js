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
         
    })

    return unsubscribeDevices
}

const createDevice = async (deviceData) => {
    // console.log('createDevice')
    const deviceDocument = doc(createDeviceCollection())
    // console.log(deviceDocument)
    // console.log(deviceDocument._key.path.segments[1])

    const deviceDataWithDeviceID = {...deviceData, id: deviceDocument._key.path.segments[1]}
    // console.log(deviceDataWithDeviceID)

    await setDoc(deviceDocument, deviceDataWithDeviceID)

    return deviceDocument._key.path.segments[1]
}

const updateDevice = async (deviceID, deviceData) => {
    console.log('updateDevice')
    // const deviceDocument = doc(firebaseDB, 'devices', deviceID)
    const deviceDocument = createDeviceDoc(deviceID)
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

const updateFavorite = async (deviceID, favorite) => {
    const deviceDocument = createDeviceDoc(deviceID)

    // Set the "capital" field of the city 'DC'
    await updateDoc(deviceDocument, {
      favorite: favorite
    });
  }

const addDataToDevice = async (deviceID, data) => {
    const dataDocument = doc(collection(firebaseDB, 'device_data'))
    console.log(dataDocument)
    console.log(dataDocument._key.path.segments[1])

    const dataWithDeviceID = {...data, deviceID: deviceID}

    await setDoc(dataDocument, dataWithDeviceID)

    return dataDocument._key.path.segments[1]
}

const getSharedDevicesQuery = (userID) => {
    const q = query(createDeviceCollection(), where('sharedWith', 'array-contains-any', [userID]))
    return q
}

const createSharedDeviceDataListener = (userID, sharedDeviceDataCallback) => {
    console.log('createSharedDeviceDataListener', userID)
    const unsubscribeDevices = onSnapshot(getSharedDevicesQuery(userID), (snapshot) => {
        const sharedDeviceData = snapshot.docs.map(doc => doc.data())
        console.log('sharedDeviceData', sharedDeviceData)
        sharedDeviceDataCallback(sharedDeviceData)
    })

    return unsubscribeDevices
}

const updateSharedDevices = async (deviceID, sharedWith) => {
    const deviceDocument = createDeviceDoc(deviceID)
    console.log(deviceDocument)
    // // console.log(deviceDataWithDeviceID)

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
