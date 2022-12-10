import Link from 'next/link'
import Image from 'next/image'

// importing custom components
import DeviceCardMenu from "./DeviceCardMenu"
import Metric from "./Metric"
import { updateFavorite } from '../../services/firebase/devices'

const DeviceCard = ({device}) => {
    let ppmEnabled = false
    let tempEnabled = false
    let levelEnabled = false

    if (device.metrics.includes('ppm')) {
        ppmEnabled = true
    }
    if (device.metrics.includes('temp')) {
        tempEnabled = true
    }
    if (device.metrics.includes('level')) {
        levelEnabled = true
    }

    const favoriteHandler = async () => {
        if (device) {
            if (device.favorite){
                try {
                    await updateFavorite(device.id, !device.favorite)
                } catch (error) {
                    console.log(error)
                }
            } else {
                await updateFavorite(device.id, true)
            }
        }
    }

    return (
        <div 
            className='flex flex-col justify-center items-center w-full min-h-fit py-[3rem] rounded-[2rem] bg-[#FFFFFF] border-2 border-[#D7D9DE] shadow-md' 
            id={`device-${device.id}`}
        >
            <div className='flex flex-col justify-center w-5/6 space-y-[1rem]'>
                <div className='flex flex-row items-center w-full h-fit space-x-[1rem]'>
                    <h1 className='text-4xl text-[#9CBA96] font-bold'>
                        {device.name}
                    </h1>
                    <h2 className='font-medium'>{`#${device.id}`}</h2>
                    <div className='flex flex-row w-full justify-end'>
                        <button 
                            className='flex justify-end relative items-center h-[2rem] w-[2rem] px-[1.6rem]'
                            onClick={favoriteHandler}
                        >
                            <Image src={device.favorite ? '/images/bookmark.svg':'/images/unbookmark.svg'} layout='fill'/>
                        </button>
                        <DeviceCardMenu device={device}/>
                    </div>
                </div>

                <div className='flex flex-row min-h-fit space-x-[2rem]'>
                    {device.imageURI && (
                        <img 
                            className='w-[10rem] h-[10rem] rounded-[0.3rem]'
                            src={device.imageURI}
                            alt='device_image'
                        >
                        </img>
                    )}
                    <div className={`flex flex-col ${device.image === '' ? 'w-full': 'w-2/3'} h-full`}>
                        <p className='text-lg font-normal'>{`Monitoring: ${device.monitor}`}</p>
                        <p className='text-lg font-normal'>{`Created: ${device.timestamp.toDate().toDateString()}`}</p>
                        <p className='text-lg font-normal text-justify'>{device.description}</p>
                    </div>
                </div>

                <div className='flex flex-row w-full min-h-fit justify-center items-center space-x-[2rem]'>
                    <Metric
                        label='PPM'
                        enabled={ppmEnabled}
                    />
                      <Metric
                        label='TEMP'
                        enabled={tempEnabled}
                    />
                      <Metric
                        label='LEVEL'
                        enabled={levelEnabled}
                    />
                </div>
                <div class='flex justify-center pt-[2rem]'>
                    <Link 
                        href={`/dashboard#device-data-${device.id}`}
                        className='min-w-fit py-[0.6rem] px-[1.4rem] bg-[#B6CB9E] hover:bg-[#9CBA96] text-white text-lg font-semibold rounded-[2rem]'
                        scroll={false}
                    >
                        View Device Data
                    </Link>
                </div>
            </div>
        </div>
        
    )
}

export default DeviceCard