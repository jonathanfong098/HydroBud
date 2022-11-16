import React, { useState } from "react"
import Input from '../../components/input'
import Button from "../../components/button"
import Image from 'next/image'

import useInput from "../../hooks/use-input"
import { validatePassword, validateConfirmPassword } from "../../utils/validateInput"

const SignUp = () => {
    const {inputState: passwordState, dispatchInput: dispatchPassword} = useInput(validatePassword)
    const {value: password, valueIsValid: passwordIsValid, errorMessage: passwordError} = passwordState
    const passwordChangeHandler = (event) => {
        dispatchPassword({type:'USER_INPUT', value: event.target.value})
        if (!passwordInputTouched) {
            setPasswordInputTouched(true)
        }
    }
    const[passwordInputTouched, setPasswordInputTouched] = useState(false)
    const passwordInputIsInvalid = !passwordIsValid && passwordInputTouched

    const [confirmPassword, setConfirmPassword] = useState('')
    const confirmPasswordChangeHandler = (event) => {
        setConfirmPassword(event.target.value)
        if (!confirmPasswordInputTouched) {
            setConfirmPasswordInputTouched(true)
        }
    }
    const {valueIsValid: confirmPasswordIsValid, errorMessage: confirmPasswordError} = validateConfirmPassword(password, confirmPassword)
    const[confirmPasswordInputTouched, setConfirmPasswordInputTouched] = useState(false)
    const confirmPasswordInputIsInvalid = (!passwordIsValid && confirmPasswordInputTouched) || (!confirmPasswordIsValid && confirmPasswordInputTouched) 

    const [passwordVisible, setPasswordVisible] = useState(true)
    const showPassword = (event) => {
        event.preventDefault()
        setPasswordVisible(!passwordVisible)
    }

    const signupHandler = (event) => {
        event.preventDefault()
    }

    return(
        <div className='flex flex-row h-screen w-screen'>
            <div className='w-2/5 h-full bg-gradient-to-br from-[#92B4A7] to-[#A9D978]'></div>
            <div className='flex w-3/5 justify-center'>
                <form 
                    className='flex flex-col w-2/5 h-full justify-center space-y-[4rem]' 
                    onSubmit={signupHandler}
                >
                    <div>
                        <label htmlFor='username' className='text-[2rem] font-semibold'>Username</label>
                        <div className='flex w-full h-[4rem] bg-[#D7D9DE] rounded-[1rem] focus:outline-none focus:border-[0.13rem] focus:border-[#7A7A7A]'>
                            <input
                                name='username'
                                type='text'
                                className='w-full h-full mx-[1rem] bg-transparent text-[1.5rem] focus:outline-none'
                            >
                            </input>
                        </div>
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
                        {passwordInputIsInvalid && (<div className='text-[12px] text-[#BD180F] font-montserrat_regular mx-[16px]'>{passwordError}</div>)}
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
                        {(!confirmPasswordIsValid && confirmPasswordInputTouched) && (<div className='text-[12px] text-[#BD180F] font-montserrat_regular mx-[16px]'>{confirmPasswordError}</div>)}
                    </div>

                    <div className="flex justify-center">
                        <button 
                            className={`h-[5rem] w-[9rem] bg-[#B6CB9E] font-semibold text-white text-3xl rounded-[2rem] hover:bg-[#BAC0D0]`}
                            onClick={signupHandler}
                        >
                            Sign Up
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default SignUp