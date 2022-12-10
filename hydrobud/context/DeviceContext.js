import React, { useContext, createContext, useState, useEffect } from 'react'

import { createDevicesListener, createSharedDeviceDataListener } from '../services/firebase/devices'

// importing custom context
import { useAuthContext } from './AuthContext'

const DefaultDevicesContext = {
    devices: []
}

const DevicesContext = createContext(DefaultDevicesContext)

const useDeviceContext = () => {
    return useContext(DevicesContext)
}

const DevicesProvider = ({children}) => {
    const { currentUser, initializing } = useAuthContext()

    const [devices, setDevices] = useState([])
    const [sharedDevices, setSharedDevices] = useState([])
    
 
    useEffect(() => {
        if (!initializing && currentUser) {
            const unsubscribeDevices = createDevicesListener(currentUser.uid, setDevices)
            const unsubscribeSharedDevice = createSharedDeviceDataListener(currentUser.uid, setSharedDevices)
        }
    }, [])

    const devicesContext = {
        devices: devices,
        sharedDevices: sharedDevices
    }

    return (
        <DevicesContext.Provider value={devicesContext}>
            {children}
        </DevicesContext.Provider>
    )
}

export { useDeviceContext }
export default DevicesProvider