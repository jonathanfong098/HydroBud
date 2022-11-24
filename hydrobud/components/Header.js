import React from 'react'
import Link from 'next/link'
import Alert from './Alert'

const Header = ({children}) => {
    return (
        <div className='flex flex-row justify-center items-center space-x-[4rem] w-screen min-h-[6rem] max-h-[10rem] bg-gradient-to-br from-[#92B4A7] to-[#A9D978]'>
            <div className='flex justify-center items-center'>
                <Link href='/' className='text-[#FFFFFF]'>Hydrobud</Link>
            </div>

            <button>Devices</button>
            <button>Profile</button>
            <button>Logout</button>
        </div>
    )
}

export default Header