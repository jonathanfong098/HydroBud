import { Fragment } from 'react'
import { Menu, Transition} from '@headlessui/react'
import Image from 'next/image'
import ForwardPropsLink from '../ForwardPropsLink'
import { deleteDevice as deleteDeviceRequest} from "../../services/firebase/devices";

const DeviceCardMenu = ({device}) => {
  return (
    <Menu>
        <Menu.Button className='relative w-[2rem] h-[2rem]'>

                <Image   
                    src='/images/horizontal_dots.svg'
                    layout='fill'
                    alt='eye'
                />
        </Menu.Button>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className='flex flex-col absolute w-[10rem] divide-y divide-gray-100 mt-[-0.8rem] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <Menu.Item>
                {/* {({ active }) => (
                    <div className={`flex justify-center items-center leading-[2.5rem]`}>
                        <ForwardPropsLink href='/dashboard'>Edit</ForwardPropsLink>
                    </div>
                )} */}
                    <div className={`flex flex-row justify-center items-center space-x-[0.5rem] leading-[2.5rem]`}>
                        <div className='relative w-[1.3rem] h-[1.3rem]'>
                            <Image
                                src='/images/pencil_square.svg'
                                layout='fill'
                                alt='pencil'
                            />
                        </div>
                        <div className=''>
                            <ForwardPropsLink href='/dashboard'>Edit</ForwardPropsLink>
                        </div>
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div className={`flex flex-row justify-center items-center space-x-[0.5rem] w-full leading-[2.5rem]`}>
                        <div className='relative w-[1.3rem] h-[1.3rem]'>
                            <Image
                                src='/images/trash.svg'
                                layout='fill'
                                alt='trash'
                            />
                        </div>
                        <button onClick={() => {deleteDeviceRequest(device.id)}}>Delete</button>
                    </div>
                </Menu.Item>
            </Menu.Items>
        </Transition>
    </Menu>
  )
}

export default DeviceCardMenu