import React from 'react'

// importing custom components
import LoginForm from '../../components/Account/LoginForm'
import AuthenticationPage from '../../components/Layout/AuthenticationPage'

const LoginPage = () => {
    return(
        <AuthenticationPage>
            <LoginForm/>
        </AuthenticationPage>
    )
}

export default LoginPage