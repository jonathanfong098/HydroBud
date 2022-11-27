import React from "react"

// importing custom components
import DeviceCard from "./DeviceCard"

const DeviceCardList = ({devices}) => {
    return (
        <>
            <div className='h-full flex flex-col items-center space-y-[3rem] pt-[3rem] pb-[2rem] bg-[#F0F0F0]'>
                {
                    devices.map((device) => {
                        return (
                            <DeviceCard 
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

export default DeviceCardList