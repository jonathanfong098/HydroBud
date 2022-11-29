import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Homepage = () => {
    return (
        <div className='flex flex-col justify-center h-screen bg-gradient-to-r from-[#92B4A7] to-[#A9D978]'>
            <div className='flex flex-row justify-end h-full'>
                <div className='flex gap-x-[2rem] mt-[4rem] mr-[2rem]'>
                    <Link href='/login' className='h-[5rem] w-[9rem] bg-[#D7D9DE] font-semibold text-white text-3xl rounded-[2rem] hover:bg-[#BAC0D0] flex justify-center items-center'><p>Login</p></Link>
                    <Link href='/sign-up' className='h-[5rem] w-[9rem] bg-[#D7D9DE] font-semibold text-white text-3xl rounded-[2rem] hover:bg-[#BAC0D0] flex justify-center items-center'><p>Sign Up</p></Link>
                </div>
            </div>
            <div className='h-full pb-[11rem]'>
                <h1 className='text-center tracking-wider text-9xl text-white font-bold'>HydroBud</h1>
                <div className='flex w-full justify-center pt-[2rem]'>
                    <div 
                        className='relative w-[16rem] h-[11rem]' 
                    >
                        <Image   
                            src='/images/hydrobud_logo.png'
                            layout='fill'
                            alt='hydrobud_logo'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage