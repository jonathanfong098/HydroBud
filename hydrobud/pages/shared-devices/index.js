import React, { useState, useEffect } from 'react'

// importing custom components
import HeaderPage from '../../components/Layout/HeaderPage'
import SharedDevicesCardList from '../../components/SharedDevices/SharedDevicesCardList'

// importing custom context
import { useDeviceContext } from '../../context/DeviceContext'

const Devices = () => {
    const {sharedDevices} = useDeviceContext()
    return (
        <HeaderPage>
            <div className='flex justify-center'>
                <SharedDevicesCardList devices={sharedDevices}/>
            </div>
        </HeaderPage>
    )
}

Devices.requireAuth = true

export default Devices
