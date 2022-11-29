import React, { useState, useEffect } from 'react'

// importing custom components
import HeaderPage from '../../components/layout/HeaderPage'
import DeviceCardList from '../../components/Devices/DeviceCardList'

// importing custom context
import { useDeviceContext } from '../../context/DeviceContext'

// const device = {
//     id: 12345,
//     name: 'Arduino',
//     image: 'https://drem-media.s3.us-west-2.amazonaws.com/1669238037742.jpeg',
//     description: 'She had come to the conclusion that you could tell a lot about a person by their ears. The way they stuck out and the size of the earlobes could give you wonderful insights into the person.',
//     monitor: 'Tomatoes',
//     metrics: ['PPM', 'Temp', 'Level']
// }

// const device2 = {
//     id: 12321,
//     name: 'Robot',
//     // image: 'https://drem-media.s3.us-west-2.amazonaws.com/1669238037742.jpeg',
//     image: '',
//     // description: 'Im meant to be writing at this moment. What I mean is, Im meant to be writing something else at this moment. She had come to the conclusion that you could tell a lot about a person by their ears. The way they stuck out and the size of the earlobes could give you wonderful insights into the person.',
//     monitor: 'Lettuce',
//     metrics: ['PPM', 'Temp', 'Level']
// }

// const device3 = {
//     id: 3213,
//     name: 'Robot',
//     image: 'https://drem-media.s3.us-west-2.amazonaws.com/1669238037742.jpeg',
//     // image: '',
//     description: 'Im meant to be writing at this moment. What I mean is, Im meant to be writing something else at this moment. She had come to the conclusion that you could tell a lot about a person by their ears. The way they stuck out and the size of the earlobes could give you wonderful insights into the person.',
//     monitor: 'Lettuce',
//     metrics: ['PPM', 'Temp', 'Level']
// }

// const device4 = {
//     id: 42142,
//     name: 'Robot',
//     image: 'https://drem-media.s3.us-west-2.amazonaws.com/1669238037742.jpeg',
//     // image: '',
//     description: 'Im meant to be writing at this moment. What I mean is, Im meant to be writing something else at this moment. She had come to the conclusion that you could tell a lot about a person by their ears. The way they stuck out and the size of the earlobes could give you wonderful insights into the person.',
//     monitor: 'Lettuce',
//     metrics: ['PPM', 'Temp', 'Level']
// }


// // const devices = [device]
// const devices = [device, device2, device3, device4]

const Devices = () => {
    const deviceContext = useDeviceContext()
    // console.log(deviceContext.devices)

    return (
        <HeaderPage>
            <div className='flex justify-center'>
                <DeviceCardList devices={deviceContext.devices}/>
            </div>
           
            {/* <DeviceCardList devices={devices}/> */}
            {/* {deviceContext.devices.length > 0 && <div className='w-full h-[1rem] bg-[#F0F0F0]'/>} */}
        </HeaderPage>
    )
}

Devices.requireAuth = true

export default Devices