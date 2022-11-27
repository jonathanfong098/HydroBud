import React from 'react'

// importing custom component
import HeaderPage from '../../components/layout/HeaderPage'

const Dashboard = () => {
    return (
        <HeaderPage>
            <div>Dashboard</div>
        </HeaderPage>
    )
}

Dashboard.requireAuth = true

export default Dashboard