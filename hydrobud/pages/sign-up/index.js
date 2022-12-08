import React from 'react'

// importing custom components
import AuthenticationPage from '../../components/Layout/AuthenticationPage'
import SignupForm from '../../components/Account/SignupForm'


const Signup = () => {
    return(
        <AuthenticationPage>
            <SignupForm/>
        </AuthenticationPage>
    )
}

export default Signup