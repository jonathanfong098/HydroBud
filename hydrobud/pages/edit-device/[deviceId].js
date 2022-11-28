import React from 'react'
import { useRouter} from 'next/router'

// importing custom components
import HeaderPage from '../../components/Layout/HeaderPage'
import EditDeviceForm from '../../components/Devices/EditDeviceForm'

const EditDevice = () => {
    const router = useRouter()
    const deviceID = router.query.deviceId
    console.log(deviceID)

    return (
        <HeaderPage>
            <div className='flex justify-center'>
                <EditDeviceForm deviceID={deviceID}/>
            </div>
        </HeaderPage>
    )
}

EditDevice.requireAuth = true

export default EditDevice