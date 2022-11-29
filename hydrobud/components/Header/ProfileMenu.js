import { Fragment } from 'react'
import { Menu, Transition} from '@headlessui/react'
import Image from 'next/image'

// importing custom components
import LogoMenuItem from '../LogoMenuItem'
import EditProfile from '../Profile/EditProfile'

import useAlert from '../../hooks/use-alert'

const DevicesMenu = ({label}) => {
    const editProfileHandler = () => {
        openModal()
    }

    const { alertIsOpen: modalOpen, openAlert: openModal, closeAlert: closeModal} = useAlert()
    return (
        <>
            <Menu>
                <Menu.Button className='text-white text-[1.6rem] font-semibold'>
                    {label}
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <Menu.Items className='flex flex-col absolute inset-x-0 top-[2.5rem] w-full divide-y divide-gray-100 rounded-[1rem] bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                            <div className={`flex flex-row justify-center items-center py-[0.8rem] space-x-[0.5rem] w-full leading-[2.5rem]`}>
                                <div className='relative w-[1.5rem] h-[1.5rem]'>
                                    <Image
                                        src='/images/pencil_square.svg'
                                        layout='fill'
                                        alt='edit_profile'
                                    />
                                </div>
                                <button onClick={editProfileHandler}>Edit Profile</button>
                            </div>
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
            <EditProfile isOpen={modalOpen} closeModal={closeModal}/>
        </>
    )
}

export default DevicesMenu
