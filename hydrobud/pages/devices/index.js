import React, { useState, useEffect } from "react"

import Header from '../../components/Header'
import DeviceCardList from "../../components/Devices/DeviceCardList"
import { useDeviceContext } from "../../context/DeviceContext";

import { collection, getDocs } from "firebase/firestore";
import { firebaseDB } from "../../services/firebase/firebase-config"

const device = {
    id: 12345,
    name: 'Arduino',
    imageURI: 'https://drem-media.s3.us-west-2.amazonaws.com/1669238037742.jpeg',
    description: 'She had come to the conclusion that you could tell a lot about a person by their ears. The way they stuck out and the size of the earlobes could give you wonderful insights into the person.',
    monitor: 'Tomatoes',
    metrics: ['PPM', 'Temp', 'Level']
}

const device2 = {
    id: 67890,
    name: 'Robot',
    imageURI: 'https://drem-media.s3.us-west-2.amazonaws.com/1669238037742.jpeg',
    description: 'Im meant to be writing at this moment. What I mean is, Im meant to be writing something else at this moment.',
    monitor: 'Lettuce',
    metrics: ['PPM', 'Temp', 'Level']
}

const devices = [device, device2]

const Devices = () => {

    const deviceContext = useDeviceContext()
    console.log(deviceContext.devices)

    return (
        <div className='w-screen h-screen bg-[#F0F0F0]'>
            <Header/>
            <DeviceCardList devices={deviceContext.devices}/>
            {/* <DeviceCardList devices={devices}/> */}
            {deviceContext.devices.length > 0 && <div className='w-full h-[1rem] bg-[#F0F0F0]'/>}
        </div>
    )
}

export default Devices