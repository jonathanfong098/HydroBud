import React from 'react'

// importing custom components
import AuthenticationPage from '../../components/Layout/AuthenticationPage'
import ForgotPasswordForm from '../../components/Account/ForgotPasswordForm'

const ForgotPasswordPage = () => {
    return (
        <AuthenticationPage>
            <ForgotPasswordForm/>
        </AuthenticationPage>
    )
}

export default ForgotPasswordPage