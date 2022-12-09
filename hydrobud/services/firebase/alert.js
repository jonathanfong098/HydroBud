import { doc, collection, query, where, orderBy, onSnapshot, deleteDoc, setDoc, getDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore'
import { firebaseDB } from './firebase-config'
import { createDeviceDoc } from './devices'
import { createNotification } from './firebase-auth'

const createAlarmDoc = (deviceID, alarmID) => {
    return doc(firebaseDB, `devices/${deviceID}/alarms/${alarmID}`)
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
    
    alarmsCallback(alarms)

    return unsubscribeAlarms
    })
}

const setOffAlarm = async (alarm, deviceData, device, userID) => {
    console.log('setOffAlarm', alarm, deviceData)
    if (alarm.type === 'ppm' || alarm.type === 'temp'){
        console.log('alarm.type === ppm|| alarm.type === temp')
        if (alarm.comparison === 'Greater') {
            console.log('deviceData > alarm.threshold')
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
            console.log('deviceData >= alarm.threshold')
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
            console.log('deviceData <= alarm.threshold')
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
            console.log('deviceData < alarm.threshold')
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
            console.log('alarm.threshold  === deviceData')
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
        console.log('noting')
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