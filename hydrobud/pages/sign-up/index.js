import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { validatePassword, validateConfirmPassword, validateUsername, validateEmail } from '../../utils/validateInput'
import { signup } from '../../services/firebase/firebase-auth'

// importing custom components
import Alert from '../../components/Alert'
import Button from '../../components/Button'
import Input from '../../components/Input'

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
            <div className='flex w-3/5 h-full justify-center bg-[#F0F0F0]'>
                <form 
                    className='flex flex-col w-2/5 max-[20rem] h-full justify-center space-y-[0.9rem]'
                    onSubmit={signupHandler}
                >
                    {/* email text box*/}
                    <Input 
                        name={'email'}
                        label={'Email'}
                        value={email} 
                        onChangeHandler={emailChangeHandler}
                        valueInputIsInvalid={emailInputIsInvalid}
                        valueError={emailError}
                    />

                    {/* username text box*/}
                    <Input 
                        name={'username'}
                        label={'Username'}
                        value={username} 
                        onChangeHandler={usernameChangeHandler}
                        valueInputIsInvalid={usernameInputIsInvalid}
                        valueError={usernameError}
                    />

                    {/* password text box*/}
                    <Input 
                        name={'password'}
                        label={'Password'}
                        value={password} 
                        onChangeHandler={passwordChangeHandler}
                        valueInputIsInvalid={passwordInputIsInvalid}
                        valueError={passwordError}
                    >
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
                    </Input>

                    {/* confirm password text box*/}
                    <Input 
                        name={'confirm_password'}
                        label={'Confirm Password'}
                        value={confirmPassword} 
                        onChangeHandler={confirmPasswordChangeHandler}
                        valueInputIsInvalid={confirmPasswordInputIsInvalid}
                        valueError={confirmPasswordError}
                    >
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
                    </Input>

                    <div className='flex justify-center'>
                        <Button 
                            onClickHandler={signupHandler}
                            isDisabled={!formIsValid}
                        >
                            Sign Up
                        </Button>
                    </div>

                    <div className='flex flex-row space-x-[0.5rem] justify-center'>
                        <div>Already Have an Account?</div>
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