import { Menu } from '@headlessui/react'
import Image from 'next/image'

// importing custom components
import ForwardPropsLink from './ForwardPropsLink'

const LogoMenuItem = ({label, src, isLink, href, alt, onClickHandler, hover, deviceMenu}) => {
    if (isLink){
        return (
            <Menu.Item>
                <ForwardPropsLink href={href}>
                    <div className={`flex flex-row justify-center items-center ${deviceMenu ? 'py-[0.2rem]':'py-[0.8rem]'}  space-x-[0.5rem] leading-[2.5rem] ${hover ? hover.style:''}`}>
                        <div className='relative w-[1.5rem] h-[1.5rem]'>
                            <Image
                                src={src}
                                layout='fill'
                                alt={alt}
                            />
                        </div>
                        <div>
                            {/* <ForwardPropsLink href={href}></ForwardPropsLink> */}
                            {label}
                        </div>
                    </div>
                </ForwardPropsLink>
            </Menu.Item>
        )
    } else {
        return (
            <Menu.Item>
                <div 
                    className={`flex flex-row justify-center items-center py-[0.8rem] space-x-[0.5rem] w-full leading-[2.5rem] ${hover ? hover.style:''}`}
                    onClick={onClickHandler}
                >
                    <div className='relative w-[1.5rem] h-[1.5rem]'>
                        <Image
                            src={src}
                            layout='fill'
                            alt={alt}
                        />
                    </div>
                    <div>{label}</div>
                </div>
            </Menu.Item>
        )
    }
}

export default LogoMenuItem