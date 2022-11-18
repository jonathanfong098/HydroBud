import React, { useState } from "react"
// import Input from '../../components/input'
// import Button from "../../components/button"
import Link from 'next/link'
import { useRouter } from 'next/router'

import Alert from "../../components/Alert" 

import { login } from '../../services/firebase/firebase-auth'
import useAlert from "../../hooks/use-alert"

const Login = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const emailChangeHandler = (event) => {
        setEmail(event.target.value)
    }

    const [password, setPassword] = useState('')
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
    }

    const {alertIsOpen, openAlert, closeAlert, alertMessage, setAlertMessage} = useAlert()

    const loginHandler = async (event) => {
        event.preventDefault()
        console.log("Form: Signing Up")

        try {
            await login(email, password)
            router.push('/dashboard')
        } catch (error) {
            console.log(error.code)
            if (error.code === 'auth/user-not-found'){
                setAlertMessage('Email does not exist')
            }
            // setAlertMessage(error.code)
            openAlert()
        }
    }
    

    return(
        <div className='flex flex-row h-screen w-screen'>
            <Alert isOpen={alertIsOpen} closeModal={closeAlert} isError={true} title={"Error"} message={alertMessage}/>
            <div className='w-2/5 h-full bg-gradient-to-br from-[#92B4A7] to-[#A9D978]'></div>
            <div className='flex w-3/5 justify-center'>
                <form 
                    className='flex flex-col w-2/5 h-full justify-center space-y-[4rem]'
                    onSubmit={loginHandler}
                >
                    <div>
                        <label htmlFor='email' className='text-[2rem] font-semibold'>Email</label>
                        <div className={`flex flex-row w-full h-[4rem] bg-[#D7D9DE] rounded-[1rem] border-[0.13rem] border-[#FAFAFA] focus:outline-none focus-within:border-[#7A7A7A]`}>
                            <input
                                name='email'
                                type='text'
                                className='w-full h-full mx-[1rem] bg-transparent text-[1.5rem] focus:outline-none'
                                value={email}
                                onChange={emailChangeHandler}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor='password' className='text-[2rem] font-semibold'>Password</label>
                        <div className={`flex flex-row w-full h-[4rem] bg-[#D7D9DE] rounded-[1rem] border-[0.13rem] border-[#FAFAFA] focus:outline-none focus-within:border-[#7A7A7A]`}>
                            <input
                                name='password'
                                type='text'
                                className='w-full h-full mx-[1rem] bg-transparent text-[1.5rem] focus:outline-none'
                                value={password}
                                onChange={passwordChangeHandler}
                            />
                        </div>
                        <Link href='/forgotpassword'>
                            <div className="text-blue-500 hover:text-blue-800">Forgot Password?</div>
                        </Link>
                    </div>

                    <div className="flex justify-center">
                        <button 
                            className={`h-[5rem] w-[8rem] bg-[#B6CB9E] font-semibold text-white text-3xl rounded-[2rem] hover:bg-[#BAC0D0]`}
                            onClick={loginHandler}
                        >
                            Login
                        </button>
                    </div>

                    <div className="flex justify-center">
                        Do Not Have an Account? 
                        <Link href='/signup'>
                            <div className="text-blue-500 hover:text-blue-800">Sign Up</div>
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login