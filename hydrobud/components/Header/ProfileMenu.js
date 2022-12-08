import { Fragment } from 'react'
import { Menu, Transition} from '@headlessui/react'
import Image from 'next/image'

// importing custom components
import LogoMenuItem from '../LogoMenuItem'
import EditProfile from '../Profile/EditProfile'
import NotificationModal from '../Profile/NotificationModal'

import useAlert from '../../hooks/use-alert'

// importing custom context 
import { useAuthContext } from '../../context/AuthContext'

const DevicesMenu = ({label}) => {
    const { alertIsOpen: editProfileIsOpen, openAlert: openEditProfile, closeAlert: closeEditProfile } = useAlert()
    const { alertIsOpen: notificationsIsOpen, openAlert: openNotifications, closeAlert: closeNotifications } = useAlert()

    const { currentUser } = useAuthContext()
    
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
                        {/* <Menu.Item>
                            <div className={`flex flex-row justify-center items-center py-[0.8rem] space-x-[0.5rem] w-full leading-[2.5rem] hover:bg-[#B6CB9E] hover: rounded-t-[1rem] hover: cursor-pointer hover: rounded:`}
                            onClick={editProfileHandler}
                            >
                                <div className='relative w-[1.5rem] h-[1.5rem]'>
                                    <Image
                                        src='/images/pencil_square.svg'
                                        layout='fill'
                                        alt='edit_profile'
                                    />
                                </div>
                                <div>Edit Profile</div>
                            </div>
                        </Menu.Item> */}
                         <LogoMenuItem
                            label='Edit Profile'
                            src='/images/pencil_square.svg'
                            onClickHandler={openEditProfile}
                            hover={{style:'hover:bg-[#B6CB9E] hover:rounded-t-[1rem] hover: cursor-pointer'}}
                        />
                        <LogoMenuItem
                            label='Notifications'
                            src='/images/pencil_square.svg'
                            onClickHandler={openNotifications}
                            hover={{style:'hover:bg-[#B6CB9E] hover:rounded-b-[1rem] hover: cursor-pointer'}}
                        />
                        {/* <Menu.Item>
                            <div className={`flex flex-row justify-center items-center py-[0.8rem] space-x-[0.5rem] w-full leading-[2.5rem] hover:bg-[#B6CB9E] hover: cursor-pointer hover: rounded-b-[1rem]`}
                            onClick={editProfileHandler}
                            >
                                <div className='relative w-[1.5rem] h-[1.5rem]'>
                                    <Image
                                        src='/images/pencil_square.svg'
                                        layout='fill'
                                        alt='edit_profile'
                                    />
                                </div>
                                <div>Notifications</div>
                            </div>
                        </Menu.Item> */}
                    </Menu.Items>
                </Transition>
            </Menu>
            <EditProfile isOpen={editProfileIsOpen} closeModal={closeEditProfile}/>
            <NotificationModal isOpen={notificationsIsOpen} closeModal={closeNotifications} user={currentUser}/>
        </>
    )
}

export default DevicesMenu
