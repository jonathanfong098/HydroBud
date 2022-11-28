import React from "react"

// importing custom components
import DeviceDataCard from "./DeviceDataCard"

const DeviceDataCardList = ({devices}) => {
    return (
        <>
            <div className='h-full flex flex-col items-center space-y-[3rem] pt-[3rem] pb-[2rem] bg-[#F0F0F0]'>
                {
                    devices.map((device) => {
                        return (
                            <DeviceDataCard 
                                key={device.id} 
                                device={device}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}

export default DeviceDataCardList