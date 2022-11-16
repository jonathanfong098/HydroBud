import React from "react"
import Input from '../../components/input'
import Button from "../../components/button"
import Link from 'next/link'

const Login = () => {
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
                        <label htmlFor='password' className='text-[2rem] font-semibold'>Password</label>
                        <Input name={'password'}></Input>
                        <Link href='/forgotpassword'><div className="text-blue-500 hover:text-blue-800">Forgot Password?</div></Link>
                    </div>

                    <div className="flex justify-center">
                        <button className={`h-[5rem] w-[8rem] bg-[#B6CB9E] font-semibold text-white text-3xl rounded-[2rem] hover:bg-[#BAC0D0]`}>
                            Login
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <button className={`h-[5rem] w-[9rem] bg-[#B6CB9E] font-semibold text-white text-3xl rounded-[2rem] hover:bg-[#BAC0D0]`}>
                            Sign Up
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login