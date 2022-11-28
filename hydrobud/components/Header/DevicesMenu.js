import { Fragment } from 'react'
import { Menu, Transition} from '@headlessui/react'
import Image from 'next/image'

// importing custom components
import LogoMenuItem from '../LogoMenuItem'

const DevicesMenu = ({label}) => {
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
                        <LogoMenuItem
                            label='View Data'
                            src='/images/view_data.svg'
                            href='/dashboard'
                            alt='view_data'
                        />
                        <LogoMenuItem
                            label='View Devices'
                            src='/images/view_devices.svg'
                            href='/devices'
                            alt='view_devices'
                        />
                        <LogoMenuItem
                            label='Add Device'
                            src='/images/add_device.svg'
                            href='/add-device'
                            alt='add_device'
                        />
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default DevicesMenu