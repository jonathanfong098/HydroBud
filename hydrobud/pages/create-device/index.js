import React from 'react'

// importing custom components
import HeaderPage from '../../components/Layout/HeaderPage'
import DeviceForm from '../../components/Devices/DeviceForm'

const CreateDevice = () => {
    return (
        <HeaderPage>
            <div className='flex justify-center'>
                <DeviceForm/>
            </div>
        </HeaderPage>
    )
}

// CreateDevice.requireAuth = true

export default CreateDevice