import { Menu } from '@headlessui/react'
import Image from 'next/image'

// importing custom components
import ForwardPropsLink from './ForwardPropsLink'

const LogoMenuItem = ({label, src, href, alt}) => {
    return (
        <Menu.Item>
            <div className={`flex flex-row justify-center items-center py-[0.8rem] space-x-[0.5rem] leading-[2.5rem]`}>
                <div className='relative w-[1.5rem] h-[1.5rem]'>
                    <Image
                        src={src}
                        layout='fill'
                        alt={alt}
                    />
                </div>
                <div>
                    <ForwardPropsLink href={href}>{label}</ForwardPropsLink>
                </div>
            </div>
        </Menu.Item>
    )
}

export default LogoMenuItem