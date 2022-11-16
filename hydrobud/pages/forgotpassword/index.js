import React from "react"
import Input from '../../components/input'
import Button from "../../components/button"

const ForgotPassword = () => {
    return(
        <div className='flex flex-row h-screen w-screen'>
            <div className='w-2/5 h-full bg-gradient-to-br from-[#92B4A7] to-[#A9D978]'></div>
            <div className='flex w-3/5 justify-center'>
                <form className='flex flex-col w-2/5 h-full justify-center space-y-[4rem]'>
                    <div>
                        <label htmlFor='username' className='text-[2rem] font-semibold'>Username</label>
                        <Input name={'username'}></Input>
                    </div>

                    <div>
                        <label htmlFor='password' className='text-[2rem] font-semibold'>New Password</label>
                        <Input name={'password'}></Input>
                    </div>

                    <div>
                        <label htmlFor='confirmPassword' className='text-[2rem] font-semibold'>Confirm Password</label>
                        <Input name={'confirmPassword'}></Input>
                    </div>

                    <div className="flex justify-center">
                        <button className={`h-[5rem] w-[16rem] bg-[#B6CB9E] font-semibold text-white text-3xl rounded-[2rem] hover:bg-[#BAC0D0]`}>
                            Reset Password
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ForgotPassword