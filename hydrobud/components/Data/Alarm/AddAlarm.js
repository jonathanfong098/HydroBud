import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition, Tab } from '@headlessui/react'

// importing custom components
import AlarmOptions from './AlarmOptions'

const AddAlarm = ({isOpen, closeModal, deviceID, deviceMetrics}) => {
    return (
        <>
             {/* <Alert 
                isOpen={alertIsOpen} 
                closeModal={closeAddDataModal} 
                isAlert={true} 
                alertType={alertType} 
                modalTitle={alertType} 
                alertMessage={alertMessage}
            /> */}
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
                                <Dialog.Panel className='flex flex-col w-fit max-h-[40rem] overflow-y-auto p-[3rem] space-y-[1rem] rounded-[1.5rem] bg-[#F0F0F0] text-left shadow-xl transition-all'>
                                    <AlarmOptions deviceID={deviceID} deviceMetrics={deviceMetrics} closeModal={closeModal}/>
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