import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { createNotificationsListener } from '../../services/firebase/firebase-auth'

// importing custom components
import Notification from './Notification'

const NotificationModal = ({isOpen, closeModal, user, setNumberOfNotifications}) => {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        if (user) {
            const unsubscribeDevices = createNotificationsListener(user.uid, setNotifications)
        }
    }, [])

    useEffect(() => {
        setNumberOfNotifications(notifications.length)
    }, [notifications])

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div 
                            className='flex h-full items-center justify-center'
                        >
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <div className='flex items-center h-2/3'>
                                    <Dialog.Panel className='flex flex-col h-fit max-h-full w-[38rem] px-[3rem] py-[2rem] space-y-[1rem] rounded-[1.5rem] bg-[#F0F0F0] text-left shadow-xl transition-all overflow-y-auto'>
                                        { notifications.length > 0 ?
                                            (notifications.map((notification) => {
                                                return (
                                                    <Notification
                                                        key={notification.id}
                                                        id={notification.id}
                                                        userID={user.uid}
                                                        message={notification.message}
                                                        description={notification.description}
                                                        timestamp={notification.timestamp}
                                                    />
                                                )
                                            })) : (<></>)
                                        }
                                    
                                    </Dialog.Panel>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default NotificationModal