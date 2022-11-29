import React, { useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition} from '@headlessui/react'
import Image from 'next/image'

import { deleteDevice as deleteDeviceRequest} from '../../services/firebase/devices'

// importing custom components
// import ForwardPropsLink from '../ForwardPropsLink'
import Alert from '../Alert'
import LogoMenuItem from '../LogoMenuItem'
import AddData from './AddData'

// importing custom hooks
import useAlert from '../../hooks/use-alert'

const DeviceCardMenu = ({device}) => {
    const { alertIsOpen, openAlert, closeAlert } = useAlert()
    // const {
    //     alertIsOpen: addDataAlertIsOpen, 
    //     openAlert: open, 
    //     closeAlert: closeAddDataAlert, 
    //     alertMessage: addDataAlertMessage, 
    //     setAlertMessage: setAddDataAlertMessage
    // } = useAlert()
    // const [alertType, setAlertType] = useState('')  
    const { alertIsOpen: modalOpen, openAlert: openModal, closeAlert: closeModal} = useAlert()

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
                isOpen={alertIsOpen}
                closeModal={closeAlert}
                isConfirm={true} 
                modalTitle={'Are you sure you want to delete this device?'}
                confirmHandler={confirmHandler}
                doNotConfirmHandler={doNotConfirmHandler}
                confirmData={{
                    deviceID: device.id
                }}
            />
              {/* <Alert 
                isOpen={addDataAlertIsOpen} 
                closeModal={closeAddDataAlert} 
                isAlert={true} 
                alertType={alertType} 
                modalTitle={alertType} 
                alertMessage={addDataAlertMessage}
            /> */}
            <AddData 
                isOpen={modalOpen} 
                closeModal={closeModal}
                deviceID={device.id}
                deviceMetrics={device.metrics}
                // openAddDataAlert={open}
                // setAlertType={setAlertType}
                // setAddDataAlertMessage={setAddDataAlertMessage}
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
                            label='Edit'
                            src='/images/pencil_square.svg'
                            href={`/edit-device/${device.id}`}
                            alt='edit_data'
                        />
                        <Menu.Item>
                            <div className={`flex flex-row justify-center items-center py-[0.8rem] space-x-[0.5rem] w-full leading-[2.5rem]`}>
                                <div className='relative w-[1.5rem] h-[1.5rem]'>
                                    <Image
                                        src='/images/duplicate.svg'
                                        layout='fill'
                                        alt='trash'
                                    />
                                </div>
                                <button onClick={copyDeviceIDHandler}>Copy ID</button>
                            </div>
                        </Menu.Item>
                        <Menu.Item>
                            <div className={`flex flex-row justify-center items-center py-[0.8rem] space-x-[0.5rem] w-full leading-[2.5rem]`}>
                                <div className='relative w-[1.5rem] h-[1.5rem]'>
                                    <Image
                                        src='/images/trash.svg'
                                        layout='fill'
                                        alt='trash'
                                    />
                                </div>
                                <button onClick={() => {openAlert()}}>Delete</button>
                            </div>
                        </Menu.Item>
                        <Menu.Item>
                            <div className={`flex flex-row justify-center items-center py-[0.8rem] space-x-[0.5rem] w-full leading-[2.5rem]`}>
                                <div className='relative w-[1.5rem] h-[1.5rem]'>
                                    <Image
                                        src='/images/plus.svg'
                                        layout='fill'
                                        alt='trash'
                                    />
                                </div>
                                <button onClick={() => {openModal()}}>Add Data</button>
                            </div>
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default DeviceCardMenu