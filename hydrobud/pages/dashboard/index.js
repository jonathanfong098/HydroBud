import React from 'react'

// importing custom component
import HeaderPage from '../../components/Layout/HeaderPage'
import DeviceDataCardList from '../../components/Data/DeviceDataCardList'

// importing custom context
import { useDeviceContext } from '../../context/DeviceContext'
import DeviceCardList from '../../components/Devices/DeviceCardList'

const Dashboard = () => {
    const deviceContext = useDeviceContext()
    
    return (
        <HeaderPage>
            <div className='flex justify-center'>
                <DeviceDataCardList devices={deviceContext.devices}/>
            </div>

        </HeaderPage>
    )
}

Dashboard.requireAuth = true

export default Dashboard
