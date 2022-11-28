import React from 'react'

// importing custom components
import HeaderPage from '../../components/Layout/HeaderPage'
import AddDeviceForm from '../../components/Devices/AddDeviceForm'

const CreateDevice = () => {
    return (
        <HeaderPage>
            <div className='flex justify-center'>
                <AddDeviceForm/>
            </div>
        </HeaderPage>
    )
}

CreateDevice.requireAuth = true

export default CreateDevice