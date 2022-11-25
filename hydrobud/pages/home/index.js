import React from 'react'
// import Button from '../../components/button'
import Link from 'next/link'

const Homepage = () => {
    return (
        <div className='flex flex-col justify-center h-screen bg-gradient-to-r from-[#92B4A7] to-[#A9D978]'>
            <div className='flex flex-row justify-end h-full'>
                <div className='flex gap-x-[2rem] mt-[4rem] mr-[2rem]'>
                    <Link href="/login" className='h-[5rem] w-[9rem] bg-[#D7D9DE] font-semibold text-white text-3xl rounded-[2rem] hover:bg-[#BAC0D0] flex justify-center items-center'><p>Login</p></Link>
                    <Link href="/signup" className='h-[5rem] w-[9rem] bg-[#D7D9DE] font-semibold text-white text-3xl rounded-[2rem] hover:bg-[#BAC0D0] flex justify-center items-center'><p>Sign Up</p></Link>
                </div>
            </div>
            <h1 className='text-center tracking-wider text-9xl text-white font-bold'>HydroBud</h1>
            <div className='h-full'></div>
        </div>
    )
}

export default Homepage