import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// importing custom components
import Alert from '../../components/Alert'
import Button from '../../components/Button'

// importing custom hooks
import useAlert from '../../hooks/use-alert'

// importing custom context
import { useAuthContext } from '../../context/AuthContext'

import { resetPassword, errorMessage } from '../../services/firebase/firebase-auth'

const ForgotPassword = () => {
    const router = useRouter()

    const { currentUser, initializing } = useAuthContext()
    if (!initializing && currentUser) {
        router.push('/dashboard')
    }
    
    const [email, setEmail] = useState('')
    const emailChangeHandler = (event) => {
        setEmail(event.target.value)
    }

    const {alertIsOpen, openAlert, closeAlert, alertMessage, setAlertMessage} = useAlert()

    const [isError, setIsError] = useState(false)

    const resetPasswordHandler = async (event) => {
        event.preventDefault()

        try {
            await resetPassword(email)
            setAlertMessage('Check your inbox for further details')
            openAlert()
        } catch (error) {
            console.log(error.code)
            setIsError(true)
            setAlertMessage(errorMessage(error.code))
            openAlert()
        }
    }

    return(
        <div className='flex flex-row h-screen w-screen'>
            <Alert isOpen={alertIsOpen} closeModal={closeAlert} isError={isError} title={isError ? 'Error' : 'Success'} message={alertMessage}/>
            <div className='flex justify-center items-center w-2/5 h-full bg-gradient-to-br from-[#92B4A7] to-[#A9D978]'>
                <div className='relative w-[28rem] h-[20rem]'>
                    <Image
                        src='/images/hydrobud_logo.png'
                        layout='fill'
                        alt='hydrobud_log'
                    />
                </div>
            </div>
            <div className='flex w-3/5 justify-center'>
                <form 
                    className='flex flex-col w-2/5 h-full justify-center space-y-[4rem]'
                    onSubmit={resetPasswordHandler}
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

                    <div className='flex justify-center'>
                        <Button
                            onClickHandler={resetPasswordHandler}
                            colors = {{bgColor: 'B6CB9E', hoverBgColor: '9CBA96'}}
                        >
                            Reset Password
                        </Button>
                        {/* <button 
                            className='h-[4.5rem] w-[17rem] bg-[#B6CB9E] font-semibold text-white text-3xl rounded-[2rem] hover:bg-[#BAC0D0]'
                            onClick={resetPasswordHandler}
                        >
                            Reset Password
                        </button> */}
                    </div>

                    <div className='flex justify-center'>
                            <Link href='/login'>
                                <div className='text-[1.5rem] text-blue-500 hover:text-blue-800'>Login</div>
                            </Link>
                        </div>

                </form>
            </div>
        </div>
    )
}

export default ForgotPassword