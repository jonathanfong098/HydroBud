import React from 'react'

import Header from '../../components/Header'

const Dashboard = () => {
    return (
        <div className='w-screen h-screen'>
            <Header/>
        </div>
    )
}

Dashboard.requireAuth = true

export default Dashboard