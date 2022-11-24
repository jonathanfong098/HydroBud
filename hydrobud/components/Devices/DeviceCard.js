import React, { useState, useEffect } from "react";
import Image from 'next/image'
import DeviceCardMenu from "./DeviceCardMenu";

const DeviceCard = ({device}) => {
    return (
        <div className='flex flex-col justify-center items-center w-[38rem] h-[19rem] rounded-[1.5rem] bg-[#FFFFFF] border-2 border-[#D7D9DE]'>
            <div className='flex flex-col justify-center relative w-[32rem] space-y-[1rem] mt-[-1rem]'>
                <div className='flex flex-row items-center w-full h-fit space-x-[1rem]'>
                    <div className='text-4xl text-[#9CBA96] font-bold'>
                        {device.name}
                    </div>
                    <div className='font-medium'>{`#${device.id}`}</div>
                    <div className='flex flex-row w-full justify-end'>
                        {/* <div 
                            className='relative w-[2rem] h-[2rem]' 
                        >
                            <Image   
                                src='/images/horizontal-dots.svg'
                                layout='fill'
                                alt='eye'
                            />
                        </div> */}
                        <DeviceCardMenu device={device}/>
                    </div>
                </div>

                <div className='flex flex-row h-fit space-x-[2rem]'>
                    <div 
                        className='relative w-[10rem] h-[10rem]' 
                    >
                        <Image   
                            src={device.image}
                            layout='fill'
                            alt='device_image'
                            className='rounded-[0.3rem]'
                        />
                    </div>
                    <div className='flex flex-col w-2/3 h-full'>
                        <div className='text-lg font-normal'>{`Monitoring: ${device.monitor}`}</div>
                        <p className='text-lg font-normal'>{device.description}</p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default DeviceCard