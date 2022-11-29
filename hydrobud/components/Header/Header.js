import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { logout } from '../../services/firebase/firebase-auth'
import { SIGN_IN_REDIRECT_KEY, clearRedirect } from '../../utils/redirect'

// importing custom components
import Button from '../Button'
import DevicesMenu from './DevicesMenu'
import ProfileMenu from './ProfileMenu'

// importing custom context
import { useAuthContext } from '../../context/AuthContext'

const Header = ({children}) => {
    const { setCurrentUser } = useAuthContext()
    const router = useRouter()

    const logoutHandler = () => {
        logout()
        router.push('/login')
        setCurrentUser(null)
        clearRedirect(SIGN_IN_REDIRECT_KEY)
    }

    return (
        <div className=' flex flex-row static justify-center items-center w-screen min-h-[6rem] max-h-[10rem] bg-gradient-to-br from-[#92B4A7] to-[#A9D978]'>
            <div className='flex flex-row w-full max-w-[115rem]'>
                <div className='flex justify-center items-center w-1/3'>
                    <Link href='/' className='text-[#FFFFFF] text-[3rem] font-bold'>Hydrobud</Link>
                </div>

                <div className='flex flex-row justify-center items-center relative w-1/3'>
                    <div className='flex justify-center relative w-1/2'>
                        <DevicesMenu
                            label='Devices'
                        />
                    </div>
                    <div className='flex justify-center relative w-1/2'>
                        <ProfileMenu
                            label='Profile'
                        />
                    </div>
                </div>

                <div className='flex justify-center items-center w-1/3'>
                    <Button
                        onClickHandler={logoutHandler}
                        colors = {{bgColor: 'D7D9DE', hoverBgColor: 'BAC0D0'}}
                    >
                        Logout
                    </Button>
                </div>
            </div>
            
            
        </div>
    )
}

export default Header