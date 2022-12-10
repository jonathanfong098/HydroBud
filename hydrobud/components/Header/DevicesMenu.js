import { Fragment } from 'react'
import { Menu, Transition} from '@headlessui/react'

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
                    <Menu.Items className='flex flex-col absolute top-[2.5rem] w-full divide-y divide-gray-100 rounded-[1rem] bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <LogoMenuItem
                            label='View Data'
                            alt='view_data'
                            src='/images/view_data.svg'
                            isLink={true}
                            href='/dashboard'
                            hover={{style:'hover:bg-[#B6CB9E] hover:rounded-t-[1rem]'}}
                            deviceMenu
                        />
                        <LogoMenuItem
                            label='View Devices'
                            src='/images/view_devices.svg'
                            alt='view_devices'
                            href='/devices'
                            isLink={true}
                            hover={{style:'hover:bg-[#B6CB9E]'}}
                            deviceMenu
                        />
                        <LogoMenuItem
                            label='View Shared Devices'
                            src='/images/view_devices.svg'
                            alt='shared_devices'
                            href='/shared-devices'
                            isLink={true}
                            hover={{style:'hover:bg-[#B6CB9E]'}}
                            deviceMenu
                        />
                        <LogoMenuItem
                            label='Add Device'
                            src='/images/add_device.svg'
                            alt='add_device'
                            href='/add-device'
                            isLink={true}
                            hover={{style:'hover:bg-[#B6CB9E] hover:rounded-b-[1rem]'}}
                            deviceMenu
                        />
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default DevicesMenu