import React, { useState, useEffect } from 'react'

// importing custom components
import HeaderPage from '../../components/Layout/HeaderPage'
import DeviceCardList from '../../components/Devices/DeviceCardList'

// importing custom context
import { useDeviceContext } from '../../context/DeviceContext'

const Devices = () => {
    const {devices} = useDeviceContext()
    return (
        <HeaderPage>
            <div className='flex justify-center'>
                <DeviceCardList devices={devices}/>
            </div>
        </HeaderPage>
    )
}

Devices.requireAuth = true

export default Devices
