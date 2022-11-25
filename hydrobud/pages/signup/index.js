import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { validatePassword, validateConfirmPassword, validateUsername, validateEmail } from '../../utils/validateInput'
import { signup } from '../../services/firebase/firebase-auth'

// importing custom components
import Alert from '../../components/Alert'

// importing custom hooks
import useInput from '../../hooks/use-input'
import useAlert from '../../hooks/use-alert'

// importing custom context
import { useAuthContext } from '../../context/AuthContext'

const Signup = () => {
    const router = useRouter()

    const { currentUser, initializing } = useAuthContext()
    if (!initializing && currentUser) {
        router.push('/dashboard')
    }

    const {
        inputState: emailState, 
        dispatchInput: dispatchEmail, 
        touchValueInput: touchEmailInput,
        valueInputIsInvalid: emailInputIsInvalid
    } = useInput(validateEmail)
    const {value: email, valueIsValid: emailIsValid, errorMessage: emailError} = emailState
    const emailChangeHandler = (event) => {
        dispatchEmail({type:'USER_INPUT', value: event.target.value})
        touchEmailInput()
    }

    // manages username input
    const {
        inputState: usernameState, 
        dispatchInput: dispatchUsername,
        touchValueInput: touchUsernameInput,
        valueInputIsInvalid: usernameInputIsInvalid
    } = useInput(validateUsername)
    const {value: username, valueIsValid: usernameIsValid, errorMessage: usernameError} = usernameState
    const usernameChangeHandler = (event) => {
        dispatchUsername({type:'USER_INPUT', value: event.target.value})
        touchUsernameInput()
    }

    // manages password input
    const {
        inputState: passwordState, 
        dispatchInput: dispatchPassword,
        touchValueInput: touchPasswordInput,
        valueInputIsInvalid: passwordInputIsInvalid
    } = useInput(validatePassword)
    const {value: password, valueIsValid: passwordIsValid, errorMessage: passwordError} = passwordState
    const passwordChangeHandler = (event) => {
        dispatchPassword({type:'USER_INPUT', value: event.target.value})
        touchPasswordInput()
    }

    // manages confirm password input
    const [confirmPassword, setConfirmPassword] = useState('')
    const {valueIsValid: confirmPasswordIsValid, errorMessage: confirmPasswordError} = validateConfirmPassword(password, confirmPassword)
    const[confirmPasswordInputTouched, setConfirmPasswordInputTouched] = useState(false)
    const confirmPasswordChangeHandler = (event) => {
        setConfirmPassword(event.target.value)
        if (!confirmPasswordInputTouched) {
            setConfirmPasswordInputTouched(true)
        }
    }
    const confirmPasswordInputIsInvalid = (!passwordIsValid && confirmPasswordInputTouched) || (!confirmPasswordIsValid && confirmPasswordInputTouched) 

    // manages whether password is visible 
    const [passwordVisible, setPasswordVisible] = useState(false)
    const showPassword = (event) => {
        event.preventDefault()
        setPasswordVisible(!passwordVisible)
    }

    const signupHandler = async (event) => {
        event.preventDefault()
        console.log('Form: Signing Up')

        try {
            await signup(email, username, password)
            router.push('/dashboard')
        } catch (error) {
            setAlertMessage(error.code)
            openAlert()
        }
    }
    
    //manage alert state
    const {alertIsOpen, openAlert, closeAlert, alertMessage, setAlertMessage} = useAlert()

    // manages if form can be submitted 
    const formIsValid = emailIsValid && usernameIsValid && passwordIsValid && confirmPasswordIsValid 

    return(
        <div className='flex flex-row h-screen w-screen'>
            <Alert isOpen={alertIsOpen} closeModal={closeAlert} isAlert={true} alertType={'error'} modalTitle={'Error'} alertMessage={alertMessage}/>
            <div className='flex w-2/5 h-full bg-gradient-to-br from-[#92B4A7] to-[#A9D978]'/>
            <div className='flex w-3/5 h-full justify-center'>
                <form 
                    className={`flex flex-col w-2/5 max-[20rem] h-full justify-center space-y-[0.9rem]`}
                    onSubmit={signupHandler}
                >
                    {/* email text box*/}
                    <div>
                        <label htmlFor='email' className='text-[2rem] font-semibold'>Email</label>
                        <div className={`flex flex-row w-full h-[4rem] bg-[#D7D9DE] rounded-[1rem] border-[0.13rem] ${emailInputIsInvalid ? 'border-[#EE392F]' : 'border-[#FAFAFA]'} focus:outline-none ${emailInputIsInvalid ? '' : 'focus-within:border-[#7A7A7A]'}`}>
                            <input
                                name='email'
                                type='text'
                                className='w-full h-full mx-[1rem] bg-transparent text-[1.5rem] focus:outline-none'
                                value={email}
                                onChange={emailChangeHandler}
                                onBlur={emailChangeHandler}
                            />
                        </div>
                        {emailChangeHandler && (<div className='text-[0.8rem] text-[#EE392F] ml-[1rem]'>{emailError}</div>)}
                    </div>

                    {/* username text box*/}
                    <div>
                        <label htmlFor='username' className='text-[2rem] font-semibold'>Username</label>
                        <div className={`flex flex-row w-full h-[4rem] bg-[#D7D9DE] rounded-[1rem] border-[0.13rem] ${usernameInputIsInvalid ? 'border-[#EE392F]' : 'border-[#FAFAFA]'} focus:outline-none ${usernameInputIsInvalid ? '' : 'focus-within:border-[#7A7A7A]'}`}>
                            <input
                                name='username'
                                type='text'
                                className='w-full h-full mx-[1rem] bg-transparent text-[1.5rem] focus:outline-none'
                                value={username}
                                onChange={usernameChangeHandler}
                                onBlur={usernameChangeHandler}
                            />
                        </div>
                        {usernameInputIsInvalid && (<div className='text-[0.8rem] text-[#EE392F] ml-[1rem]'>{usernameError}</div>)}
                    </div>


                    {/* password text box*/}
                    <div>
                        <label htmlFor='password' className='text-[2rem] font-semibold'>Password</label>
                        {/* <Input name={'password'} value={password} onChange={passwordChangeHandler}/> */}
                        <div 
                            className={`flex flex-row w-full h-[4rem] bg-[#D7D9DE] rounded-[1rem] border-[0.13rem] ${passwordInputIsInvalid ? 'border-[#EE392F]' : 'border-[#FAFAFA]'} focus:outline-none ${passwordInputIsInvalid ? '' : 'focus-within:border-[#7A7A7A]'}`}
                        >
                            <input 
                                name='password'
                                type={passwordVisible ? 'text' : 'password'} 
                                className={`w-3/4 h-full ml-[1rem] bg-transparent text-[1.5rem] focus:outline-none`}
                                value={password}
                                onChange={passwordChangeHandler}
                                onBlur={passwordChangeHandler}
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
                        {passwordInputIsInvalid && (<div className='text-[0.8rem] text-[#EE392F] ml-[1rem]'>{passwordError}</div>)}
                    </div>

                    {/* confirm password text box*/}
                    <div>
                        <label htmlFor='confirmPassword' className='text-[2rem] font-semibold'>Confirm Password</label>
                        {/* <Input name={'password'} value={password} onChange={passwordChangeHandler}/> */}
                        <div 
                            className={`flex flex-row w-full h-[4rem] bg-[#D7D9DE] rounded-[1rem] border-[0.13rem] ${confirmPasswordInputIsInvalid ? 'border-[#EE392F]' : 'border-[#FAFAFA]'} focus:outline-none ${confirmPasswordInputIsInvalid ? '' : 'focus-within:border-[#7A7A7A]'}`}
                        >
                            <input 
                                name='confirmPassword'
                                type={passwordVisible ? 'text' : 'password'} 
                                className={`w-3/4 h-full ml-[1rem] bg-transparent text-[1.5rem] focus:outline-none`}
                                value={confirmPassword}
                                onChange={confirmPasswordChangeHandler}
                                onBlur={confirmPasswordChangeHandler}
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
                        {(!confirmPasswordIsValid && confirmPasswordInputTouched) && (<div className='text-[0.7rem] text-[#EE392F] ml-[1rem]'>{confirmPasswordError}</div>)}
                    </div>

                    <div className='flex justify-center'>
                        <button 
                            className={`h-[4.3rem] w-[12rem] bg-[#B6CB9E] font-semibold text-white text-3xl rounded-[2rem] hover:bg-[#9CBA96]`}
                            onClick={signupHandler}
                            disabled={!formIsValid}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className='flex justify-center'>
                        Already Have an Account 
                        <Link href='/login'>
                            <div className='text-blue-500 hover:text-blue-800'>Login</div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup