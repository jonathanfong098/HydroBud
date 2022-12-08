import { doc, collection, query, where, orderBy, onSnapshot, deleteDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore'
import { firebaseDB } from './firebase-config'
import { createDeviceDoc } from './devices'
import { createNotification } from './firebase-auth'

const createAlarmDoc = (deviceID, alarmID) => {
    const alarmDoc = doc(firebaseDB, 'devices', deviceID, 'alarms', alarmID)
    return alarmDoc
}

const createAlert = async (deviceID, alertData) => {
    console.log('alertData', alertData)
    const deviceDoc = createDeviceDoc(deviceID)
    const alertCol = collection(deviceDoc, 'alarms')
    // await addDoc(alertCol, alertData)
    const alertDoc = await addDoc(alertCol, alertData)

    return alertDoc.id
}

const getAlarms = (deviceID) => {
    const q = query(collection(firebaseDB, 'devices', deviceID, 'alarms'), orderBy('timestamp', 'desc'))
    return q
  }
  
const createAlarmsListener = (deviceID, alarmsCallback) => {
    const unsubscribeAlarms = onSnapshot(getAlarms(deviceID), (snapshot) => {
    const alarms = snapshot.docs.map(doc => {
        // console.log('message: ', doc)
        //  console.log('message id: ', doc.id)
        const data = doc.data()
        return {...data, id: doc.id}
    }) 
    // console.log('notifications: ', notifications)

    // for (const alarm of alarms) {
    //     if ()
    // }

    alarmsCallback(alarms)

    return unsubscribeAlarms
    })
}

const setOffAlarm = async (comparison, alarmData, deviceData, device, userID) => {
    console.log('setOffAlarm')
    switch(comparison){
        case 'Greater':
            if (alarmData > deviceData) {
                console.log('true')
                await createNotification(userID, {
                    message: `${device.name} exceeded ${alarmData}PPM`,
                    description: `Device ID #${device.id}` ,
                    timestamp: serverTimestamp()
                })
            }
        case 'Greater/Equal':
            return (alarmData >= deviceData)
        case 'Lower/Equal':
            return (alarmData <= deviceData)
        case 'Lower':
            return (alarmData < deviceData)
        default: 
            return false
    }
}

const toggleAlarm = async (deviceID, alarmID, alarmState) => {
    const alarmDoc = createAlarmDoc(deviceID, alarmID)
    
    await updateDoc(alarmDoc, {
        on: !alarmState
    })
}

export { createAlert, getAlarms, createAlarmsListener, setOffAlarm, toggleAlarm}