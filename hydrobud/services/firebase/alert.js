import { doc, collection, query, where, orderBy, onSnapshot, deleteDoc, setDoc, getDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore'
import { firebaseDB } from './firebase-config'
import { createDeviceDoc } from './devices'
import { createNotification } from './firebase-auth'

const createAlarmDoc = (deviceID, alarmID) => {
    return doc(firebaseDB, `devices/${deviceID}/alarms/${alarmID}`)
}

const createAlert = async (deviceID, alertData) => {
    const deviceDoc = createDeviceDoc(deviceID)
    const alertCol = collection(deviceDoc, 'alarms')
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
        const data = doc.data()
        return {...data, id: doc.id}
    }) 
    
    alarmsCallback(alarms)

    return unsubscribeAlarms
    })
}

const setOffAlarm = async (alarm, deviceData, device, userID) => {
    if (alarm.type === 'ppm' || alarm.type === 'temp'){
        if (alarm.comparison === 'Greater') {
            if (deviceData > alarm.threshold) {
                if (!alarm.on){
                    await toggleAlarm(device.id, alarm.id, alarm.on)
                    await createNotification(userID, {
                        message: alarmMessage(alarm),
                        description: `Alarm Name: ${alarm.name}\n Device ID: #${device.id}\n`,
                        timestamp: serverTimestamp()
                    })
                }
            }
        } else if (alarm.comparison === 'Greater/Equal') {
            if (deviceData >= alarm.threshold) {
                if (!alarm.on){
                    await toggleAlarm(device.id, alarm.id, alarm.on)
                    await createNotification(userID, {
                        message: alarmMessage(alarm),
                        description: `Alarm Name: ${alarm.name}\n Device ID: #${device.id}\n`,
                        timestamp: serverTimestamp()
                    })
                }
            }
        } else if (alarm.comparison === 'Lower/Equal') {
            if (deviceData <= alarm.threshold) {
                if (!alarm.on){
                    await toggleAlarm(device.id, alarm.id, alarm.on)
                    await createNotification(userID, {
                        message: alarmMessage(alarm),
                        description: `Alarm Name: ${alarm.name}\n Device ID: #${device.id}\n`,
                        timestamp: serverTimestamp()
                    })
                }
            }
        } else if (alarm.comparison === 'Lower') {
            if (deviceData < alarm.threshold) {
                if (!alarm.on){
                    await toggleAlarm(device.id, alarm.id, alarm.on)
                    await createNotification(userID, {
                        message: alarmMessage(alarm),
                        description: `Alarm Name: ${alarm.name}\n Device ID: #${device.id}\n`,
                        timestamp: serverTimestamp()
                    })
                }
            }
        } else {
            return 
        } 
    } else if (alarm.type === 'level') {
        if (alarm.threshold  === deviceData){
            if (!alarm.on){
                await toggleAlarm(device.id, alarm.id, alarm.on)
                await createNotification(userID, {
                    message: `${alarm.name} is ${alarm.threshold ? 'above water level' : 'below water level'}`,
                    description: `Alarm Name: ${alarm.name}\n Device ID: #${device.id}\n`,
                    timestamp: serverTimestamp()
                })
            }
        } 
    } else {
        return
    }
            
}

const toggleAlarm = async (deviceID, alarmID, alarmState) => {
    const alarmDoc = createAlarmDoc(deviceID, alarmID)
    
    try {
        await updateDoc(alarmDoc, {
            on: !alarmState
        })
    } catch (error) {
        throw error
    }
}

const deleteAlarm = async (deviceID, alarmID) => {
    try {
        const alarmDoc = await createAlarmDoc(deviceID, alarmID)
        if (alarmDoc) {
            await deleteDoc(alarmDoc)
        }
    } catch (error) {
        throw error
    }
}

const alarmComparisonMessage = (alarm) => {
    switch(alarm.comparison){
        case 'Greater':
            return (`${alarm.name} is above ${alarm.threshold}`)
        case 'Greater/Equal':
            return (`${alarm.name} is above or is equal to ${alarm.threshold}`)
        case 'Lower/Equal':
            return (`${alarm.name} is below or is equal to ${alarm.threshold}`)
        case 'Lower':
            return (`${alarm.name} is below ${alarm.threshold}`)
        default: 
            return ''
    }
}

const alarmMessage = (alarm) => {
    switch(alarm.type){
        case 'ppm':
            return (alarmComparisonMessage(alarm) + 'PPM')
        case 'temp':
            return (alarmComparisonMessage(alarm) + 'F')
        case 'level':
            if (alarm.threshold) {
                return (`${alarm.name} is above water level`)
            } else {
                return (`${alarm.name} is below water level`)
            }
        default: 
            return ''
    }
}

export { createAlert, getAlarms, createAlarmsListener, setOffAlarm, toggleAlarm, deleteAlarm, alarmMessage}