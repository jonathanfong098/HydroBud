import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition, Tab } from '@headlessui/react'

// importing custom components
import Alarm from './Alarm'
import { createAlarmsListener } from '../../../services/firebase/alert'

const AddAlarm = ({isOpen, closeModal, deviceID}) => {
    const [deviceAlarms, setDeviceAlarms] = useState([])

    useEffect(() => {
        const unsubscribeAlarms = createAlarmsListener(deviceID, setDeviceAlarms)
    }, [])

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
                                <Dialog.Panel className='flex flex-col w-fit max-h-[40rem] overflow-y-auto p-[2rem] space-y-[2.5rem] rounded-[1.5rem] bg-[#F0F0F0] text-left shadow-xl transition-all'>
                                <div className='flex flex-col items-center text-[1rem] font-semibold uppercase text-center'>
                                    <div className='text-[#B6CB9E]'>Alarm is on</div>
                                    <div className='text-[#EE392F]'>Alarm is off</div>
                                </div>
                                    {
                                        deviceAlarms.map((deviceAlarm) => {
                                            return (
                                                <Alarm
                                                    deviceID={deviceID}
                                                    alarm={deviceAlarm}
                                                />
                                            )
                                        })
                                    }
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default AddAlarm