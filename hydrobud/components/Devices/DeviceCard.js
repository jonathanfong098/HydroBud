import Image from 'next/image'

// importing custom components
import DeviceCardMenu from "./DeviceCardMenu"

const DeviceCard = ({device}) => {
    // console.log(device.image)

    return (
        <div className='flex flex-col justify-center items-center w-[38rem] min-h-fit pt-[3rem] pb-[4rem] rounded-[2rem] bg-[#FFFFFF] border-2 border-[#D7D9DE]'>
            <div className='flex flex-col justify-center relative w-[32rem] space-y-[1rem]'>
                <div className='flex flex-row items-center w-full h-fit space-x-[1rem]'>
                    <h1 className='text-4xl text-[#9CBA96] font-bold'>
                        {device.name}
                    </h1>
                    <div className='font-medium'>{`#${device.id}`}</div>
                    <div className='flex flex-row w-full justify-end'>
                        <DeviceCardMenu device={device}/>
                    </div>
                </div>

                <div className='flex flex-row min-h-fit space-x-[2rem]'>
                    {device.imageURI && (
                        <div 
                            className='relative w-[10rem] h-[10rem]' 
                        >
                            <Image   
                                src={device.imageURI}
                                layout='fill'
                                alt='device_image'
                                className='rounded-[0.3rem]'
                            />
                        </div>
                    )}
                    <div className={`flex flex-col ${device.image === '' ? 'w-full': 'w-2/3'} h-full`}>
                        <p className='text-lg font-normal'>{`Monitoring: ${device.monitor}`}</p>
                        <p className='text-lg font-normal text-justify'>{device.description}</p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default DeviceCard