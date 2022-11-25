import React, { useContext, createContext, useState, useEffect } from "react";

import { createDevicesListener } from "../services/firebase/devices";
import { useAuthContext } from "./AuthContext";

const DefaultDevicesContext = {
    devices: []
}

const DevicesContext = createContext(DefaultDevicesContext)

const useDeviceContext = () => {
    return useContext(DevicesContext)
}

const DevicesProvider = ({children}) => {
    const [devices, setDevices] = useState([])
    // const [unsubscribeDevices, setUnsubscribeDevices] = useState()
    const { currentUser, initializing } = useAuthContext()
 
    useEffect(() => {
        if (!initializing && currentUser) {
            console.log(currentUser)
            const unsubscribeDevices = createDevicesListener(currentUser.uid, setDevices)
        }

        // setUnsubscribeDevices(unsubscribeDevices)
    }, [])

    const devicesContext = {
        devices: devices,
        // unsubscribeDevices: unsubscribeDevices
    }

    return (
        <DevicesContext.Provider value={devicesContext}>
            {children}
        </DevicesContext.Provider>
    )
}

export { useDeviceContext }
export default DevicesProvider