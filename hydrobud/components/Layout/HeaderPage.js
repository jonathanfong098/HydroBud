import React from 'react'

// importing custom components
import Header from '../Header/Header'

const HeaderPage = ({children}) => {
    return (
        <div className='w-screen min-h-screen pb-[3rem] bg-[#F0F0F0]'>
            <Header/>
            {children}
        </div>
    )
}

export default HeaderPage