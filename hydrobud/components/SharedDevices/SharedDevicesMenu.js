import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { serverTimestamp } from 'firebase/firestore'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import { createUsersListener } from '../../services/firebase/firebase-auth'
import { updateSharedDevices } from '../../services/firebase/devices'
import { createNotification } from '../../services/firebase/firebase-auth'

// importing custom components
import UserSharedWith from './UserSharedWith'

//importing custom context
import { useAuthContext } from '../../context/AuthContext'

const SharedDevicesMenu = ({isOpen, closeModal, device}) => {
    const { currentUser, currentUserData } = useAuthContext()

    const[users, setUsers] = useState()
    const [selectedUser, setSelectedUser] = useState()

    useEffect(() => {
        const unsubscribeUsers = createUsersListener(setUsers)
    },[])
    
    const handleOnSelect = (item) => {
        setSelectedUser(item)
    }

    const formatResult = (item) => {
        return (
          <>
            <span style={{ display: 'block', textAlign: 'left' }}>email: {item.email}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>username: {item.username}</span>
          </>
        )
    }
    
    const shareHandler = async () => {
        try {
            if (currentUser.uid != selectedUser.id && !device.sharedWith.includes(selectedUser.id)){
                let newSharedDevices
                if (device.sharedWith.length > 0){
                    newSharedDevices = [...device.sharedWith, selectedUser.id]
                } else {
                    newSharedDevices = [selectedUser.id]
                }
                await updateSharedDevices(device.id, newSharedDevices)
                await createNotification(selectedUser.id, {
                    message: `${selectedUser.username} shared their device, ${device.name}, with you`,
                    description: 'Go to the shared devices page to view the device that has been shared with you',
                    timestamp: serverTimestamp()
                })
                
            }
        } catch (error) {
            throw (error)
        }
    }

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
                        className='flex min-h-full items-center justify-center'
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
                            <Dialog.Panel className='flex flex-col w-fit min-w-[40rem] px-[3rem] py-[2rem] rounded-[1.5rem] bg-[#F0F0F0] text-left shadow-xl transition-all'>
                                <div className='flex flex-col pb-[1.6rem] space-y-[0.8rem]'>
                                    <div className='text-[1.8rem] font-semibold uppercase text-white bg-[#BAC0D0] rounded-[1rem] p-[1rem] shadow-md text-center'>Share Device: {device.name} </div>
                                </div>

                                <div 
                                    className='flex flex-row w-full space-x-[1rem]'
                                >
                                    <div className='w-full'>
                                        <ReactSearchAutocomplete
                                            items={users}
                                            onSelect={handleOnSelect}
                                            autoFocus
                                            formatResult={formatResult}
                                            placeholder='Email or username'
                                            fuseOptions={{ keys: ['email', 'username'] }}
                                            resultStringKeyName='email'
                                    />
                                    </div>

                                    <button 
                                        className={`w-fit bg-[#B6CB9E] rounded-[1rem] p-[0.5rem] text-white font-semibold ${selectedUser != undefined ? 'hover:bg-[#9CBA96]' : ''}`}
                                        disabled={selectedUser == undefined}
                                        onClick={shareHandler}
                                    >
                                        Share
                                    </button>
                                </div>

                                <div className='flex flex-col space-y-[1rem] mt-[1rem] '>
                                    {device.sharedWith?.map((userID) => {
                                        return (
                                            <UserSharedWith
                                                key={userID}
                                                userID = {userID}
                                                username={currentUserData.username}
                                                device={device}
                                            />
                                        )
                                    })}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default SharedDevicesMenu