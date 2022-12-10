import { useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition} from '@headlessui/react'
import Image from 'next/image'

// importing custom components
import LogoMenuItem from '../LogoMenuItem'
import EditProfile from '../Profile/EditProfile'
import NotificationModal from '../Profile/NotificationModal'

// importing custom hooks
import useAlert from '../../hooks/use-alert'

// importing custom context 
import { useAuthContext } from '../../context/AuthContext'

const DevicesMenu = ({label}) => {
    const { currentUser } = useAuthContext()

    const { alertIsOpen: editProfileIsOpen, openAlert: openEditProfile, closeAlert: closeEditProfile } = useAlert()
    const { alertIsOpen: notificationsIsOpen, openAlert: openNotifications, closeAlert: closeNotifications } = useAlert()

    const [numberOfNotifications, setNumberOfNotifications] = useState(0)
    
    return (
        <>
            <EditProfile 
                isOpen={editProfileIsOpen} 
                closeModal={closeEditProfile}
            />
            <NotificationModal 
                isOpen={notificationsIsOpen} 
                closeModal={closeNotifications} 
                user={currentUser}
                setNumberOfNotifications={setNumberOfNotifications}
            />
            <Menu>
                <Menu.Button className='flex flex-row text-white text-[1.6rem] font-semibold items-center'>
                    {label}
                    {numberOfNotifications > 0 ? (
                        <div className='flex items-center justify-center relative w-[2.2rem] h-[2.2rem] pb-[0.2rem] ml-[0.4rem]'>
                            <Image
                                src='/images/notifications.svg'
                                layout='fill'
                                alt='notifications'
                            />
                            <div className='absolute text-white text-[1rem]'>{numberOfNotifications}</div>
                        </div>
                    ):(<></>)}
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
                         <LogoMenuItem
                            label='Edit Profile'
                            src='/images/pencil_square.svg'
                            onClickHandler={openEditProfile}
                            hover={{style:'hover:bg-[#B6CB9E] hover:rounded-t-[1rem] hover: cursor-pointer'}}
                        />
                        <Menu.Item>
                    <div 
                        className={`flex flex-row justify-center items-center py-[0.8rem] space-x-[0.5rem] w-full leading-[2.5rem] hover:bg-[#B6CB9E] hover:rounded-b-[1rem] hover: cursor-pointer`}
                        onClick={openNotifications}
                    >
                        <div className='flex items-center justify-center relative w-[2.2rem] h-[2.2rem]'>
                        <Image
                            src='/images/notifications.svg'
                            layout='fill'
                            alt='notifications'
                        />
                        <div className='absolute text-white text-[1rem] pb-[0.2rem]'>{numberOfNotifications}</div>
                    </div>
                        <div>Notifications</div>
                </div>
            </Menu.Item>
                        
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default DevicesMenu
