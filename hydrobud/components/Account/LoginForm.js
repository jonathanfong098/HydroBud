import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { login, errorMessage} from '../../services/firebase/firebase-auth'
import { SIGN_IN_REDIRECT_KEY, getRedirect } from '../../utils/redirect'

// importing custom components
import Alert from '../Alert'
import Button from '../Button'

// importing custom hooks
import useAlert from '../../hooks/use-alert'

// importing custom context
import { useAuthContext } from '../../context/AuthContext'

const LoginForm = () => {
    const router = useRouter()

    const { currentUser, initializing } = useAuthContext()
    if (!initializing && currentUser) {
        router.push('/dashboard')
    }

    const [email, setEmail] = useState('')
    const emailChangeHandler = (event) => {
        setEmail(event.target.value)
    }

    const [password, setPassword] = useState('')
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
    }

    // manages whether password is visible 
    const [passwordVisible, setPasswordVisible] = useState(false)
    const showPassword = (event) => {
        event.preventDefault()
        setPasswordVisible(!passwordVisible)
    }

    const {alertIsOpen, openAlert, closeAlert, alertMessage, setAlertMessage} = useAlert()

    const loginHandler = async (event) => {
        event.preventDefault()
        console.log('Form: Signing Up')

        try {
            await login(email, password)
            if (getRedirect(SIGN_IN_REDIRECT_KEY)){
                router.push(getRedirect(SIGN_IN_REDIRECT_KEY))
            } else {
                router.push('/dashboard')
            }
        } catch (error) {
            console.log(error.code)
            setAlertMessage(errorMessage(error.code))
            openAlert()
        }
    }
    

    return(
        <>
            <Alert isOpen={alertIsOpen} closeModal={closeAlert} isAlert={true} alertType={'error'} modalTitle={'Error'} alertMessage={alertMessage}/>
            <form 
                className='flex flex-col w-2/5 h-full justify-center space-y-[4rem]'
                onSubmit={loginHandler}
            >
                <div>
                    <label htmlFor='email' className='text-[2rem] font-semibold'>Email</label>
                    <div className={`flex flex-row w-full h-[4rem] bg-[#FFFFFF] rounded-[1rem] border-[0.13rem] border-[#FAFAFA] focus:outline-none focus-within:border-[#7A7A7A]`}>
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
                    <label 
                        htmlFor='password' 
                        className='text-[2rem] font-semibold'
                    >
                        Password
                    </label>
                    <div 
                        className='flex flex-row w-full h-[4rem] bg-[#FFFFFF] rounded-[1rem] border-[0.13rem] border-[#FAFAFA] focus:outline-none focus-within:border-[#7A7A7A]'
                    >
                        <input 
                            name='password'
                            type={passwordVisible ? 'text' : 'password'} 
                            className={`w-3/4 h-full ml-[1rem] bg-transparent text-[1.5rem] focus:outline-none`}
                            value={password}
                            onChange={passwordChangeHandler}
                        />
                        <div className='flex justify-center items-center w-1/4 h-full'>
                            <button 
                                className='relative w-[2rem] h-[2rem]' 
                                onClick={showPassword}
                            >
                                <Image   
                                    src={passwordVisible ? '/images/eye.svg': '/images/eye_slash.svg'}
                                    layout='fill'
                                    alt='eye'
                                />
                            </button>
                        </div>
                    </div>
                    <Link href='/forgot-password'>
                        <div className='ml-[1rem] text-blue-500 hover:text-blue-800'>Forgot Password?</div>
                    </Link>
                </div>

                <div className='flex justify-center'>
                    <Button 
                        onClickHandler={loginHandler}
                        colors = {{bgColor: 'B6CB9E', hoverBgColor: '9CBA96'}}
                    >
                        Login
                    </Button>
                </div>

                <div className='flex flex-row space-x-[0.5rem] justify-center'>
                    <div>Do Not Have an Account? </div>
                    <Link href='/sign-up'>
                        <div className='text-blue-500 hover:text-blue-800'>Sign Up</div>
                    </Link>
                </div>

            </form>
        </>
    )
}

export default LoginForm