import React, { useState, useEffect } from "react";
import DeviceCard from "./DeviceCard";

const DeviceCardList = ({devices}) => {
    return (
        <>
            <div className='h-full flex flex-col items-center space-y-[3rem] mt-[3rem] mb-[2rem] bg-[#F0F0F0]'>
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