import React, { useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition} from '@headlessui/react'
import Image from 'next/image'

import { deleteDevice as deleteDeviceRequest} from '../../services/firebase/devices'

// importing custom components
import Alert from '../Alert'
import LogoMenuItem from '../LogoMenuItem'
import AddData from './AddData/AddData'
import SharedDevicesMenu from '../SharedDevices/SharedDevicesMenu'

// importing custom hooks
import useAlert from '../../hooks/use-alert'

const DeviceCardMenu = ({device}) => {
    const { alertIsOpen: deleteIsOpen, openAlert: openDelete, closeAlert: closeDelete } = useAlert() 
    const { alertIsOpen: addDataIsOpen, openAlert: openAddData, closeAlert: closeAddData} = useAlert()
    const { alertIsOpen: shareMenuIsOpen, openAlert: openShareMenu, closeAlert: closeShareMenu} = useAlert()

    const confirmHandler = (deviceID) => {
        deleteDeviceRequest(deviceID)
        closeAlert()
    }

    const doNotConfirmHandler = () => {
        closeAlert()
    }

    const copyDeviceIDHandler = () => {
        navigator.clipboard.writeText(device.id)
    }

    return (
        <>
            <Alert 
                isOpen={deleteIsOpen}
                closeModal={closeDelete}
                isConfirm={true} 
                modalTitle={'Are you sure you want to delete this device?'}
                confirmHandler={confirmHandler}
                doNotConfirmHandler={doNotConfirmHandler}
                confirmData={{
                    deviceID: device.id
                }}
            />
            <AddData 
                isOpen={addDataIsOpen} 
                closeModal={closeAddData}
                deviceID={device.id}
                deviceMetrics={device.metrics}
            />
            <SharedDevicesMenu
                isOpen={shareMenuIsOpen}
                closeModal={closeShareMenu}
                device={device}
            />
            <Menu>
                <Menu.Button>
                    <img   
                        src='/images/horizontal_dots.svg'
                        layout='fill'
                        alt='open_menu'
                        className='w-[2rem] h-[2rem]'
                    />
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
                    <Menu.Items className='flex flex-col absolute w-[10rem] divide-y divide-gray-100 mt-[-0.8rem] rounded-[1rem] bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <LogoMenuItem
                            label='Copy ID'
                            src='/images/duplicate.svg'
                            alt='duplicate'
                            onClickHandler={copyDeviceIDHandler}
                            hover={{style:'hover:bg-[#B6CB9E] hover:rounded-t-[1rem] hover: cursor-pointer'}}
                        />
                        <LogoMenuItem
                            label='Edit'
                            src='/images/pencil_square.svg'
                            isLink={true}
                            href={`/edit-device/${device.id}`}
                            alt='edit_data'
                            hover={{style:'hover:bg-[#B6CB9E]'}}
                        />
                        <LogoMenuItem
                            label='Delete'
                            src='/images/trash.svg'
                            alt='delete'
                            onClickHandler={openDelete}
                            hover={{style:'hover:bg-[#B6CB9E] hover: cursor-pointer'}}
                        />
                        <LogoMenuItem
                            label='Add Data'
                            src='/images/plus.svg'
                            alt='add data'
                            onClickHandler={openAddData}
                            hover={{style:'hover:bg-[#B6CB9E] hover: cursor-pointer'}}
                        />
                        <LogoMenuItem
                            label='Share'
                            alt='share_device'
                            src='/images/share_device.svg'
                            onClickHandler={openShareMenu}
                            hover={{style:'hover:bg-[#B6CB9E] hover:rounded-b-[1rem] hover: cursor-pointer'}}
                        />
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default DeviceCardMenu