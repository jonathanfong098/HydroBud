import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { logout } from '../services/firebase/firebase-auth'
import { SIGN_IN_REDIRECT_KEY, clearRedirect } from '../utils/redirect'

const Header = ({children}) => {
    const router = useRouter()

    const logoutHandler = () => {
        logout()
        router.push('/login')
        clearRedirect(SIGN_IN_REDIRECT_KEY)
    }

    return (
        <div className='flex flex-row justify-center items-center space-x-[4rem] w-screen min-h-[6rem] max-h-[10rem] bg-gradient-to-br from-[#92B4A7] to-[#A9D978]'>
            <div className='flex justify-center items-center'>
                <Link href='/' className='text-[#FFFFFF]'>Hydrobud</Link>
            </div>

            <button>Devices</button>
            <button>Profile</button>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    )
}

export default Header