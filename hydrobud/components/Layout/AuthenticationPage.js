import React from 'react'
import Image from 'next/image'

const AuthenticationPage = ({children}) => {
    return (
        <div className='flex flex-row h-screen w-screen'>
            <div className='flex justify-center items-center w-2/5 h-full bg-gradient-to-br from-[#92B4A7] to-[#A9D978]'>
                <div className='relative w-[28rem] h-[20rem]'>
                    <Image
                        src='/images/hydrobud_logo.png'
                        layout='fill'
                        alt='hydrobud_log'
                    />
                </div>
            </div>
            <div className='flex w-3/5 justify-center bg-[#F0F0F0]'>
                {children}
            </div>
        </div>
    )
}

export default AuthenticationPage