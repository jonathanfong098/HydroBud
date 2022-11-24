import React, { useContext, createContext, useState, useEffect } from "react";

import { collection, addDoc, doc, setDoc, onSnapshot } from "firebase/firestore"
import { firebaseDB } from "../services/firebase/firebase-config";

import { GET_DEVICES_QUERY } from "../services/firebase/devices";

const DefaultDevicesContext = {
    devices: []
}

const DevicesContext = createContext()

const useDeviceContext = () => {
    return useContext(DevicesContext)
}

const DevicesProvider = ({children}) => {
    const [devices, setDevices] = useState([])
    // const [unsubscribeDevices, setUnsubscribeDevices] = useState()
 
    useEffect(() => {
        const unsubscribeDevices = onSnapshot(GET_DEVICES_QUERY, (snapshot) => {
            //initialize device
            snapshot.docs.map(doc => console.log(doc.data()))
            const devices = snapshot.docs.map(doc => doc.data())
            setDevices(devices)

            // snapshot.docChanges().forEach((change) => {
            //     if (change.type === "added") {
            //         console.log("New device: ", change.doc.data());
            //     }
            //     if (change.type === "modified") {
            //         console.log("Modified device: ", change.doc.data());
            //     }
            //     if (change.type === "removed") {
            //         console.log("Removed device: ", change.doc.data());
            //     }
            //   });
        });

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