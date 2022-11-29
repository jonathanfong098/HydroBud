import React, { useState, useEffect } from 'react'

import { createDeviceDataListener } from '../../services/firebase/devices';

// importing custom components
import DeviceCardMenu from '../Devices/DeviceCardMenu'
import ReactSpeedometer from 'react-d3-speedometer';

const DeviceDataCard = ({device}) => {
    console.log('deviceID:', device.id)
    const [deviceData, setDeviceData] = useState([])

    useEffect(() => {
        const unsubscribeDeviceData = createDeviceDataListener(device.id, setDeviceData)
    }, [])
    
    if (deviceData.length > 0) {
        console.log('deviceData:', deviceData[0])
        return (
            <div className={`flex flex-col justify-center items-center ${deviceData.length > 0 ? 'min-w-fit': 'min-w-[34rem]'} min-h-fit rounded-[2rem] bg-[#FFFFFF] border-2 border-[#D7D9DE] shadow-md`}>
                <div className={`flex flex-col justify-center w-full ${deviceData.length > 0 ? 'pt-[4.3rem]': 'py-[3rem]'}  px-[3rem] space-y-[1rem]`}>
                    <div className='flex flex-row items-center w-full h-fit space-x-[1rem]'>
                        <h1 className='text-4xl text-[#9CBA96] font-bold'>
                            {device.name}
                        </h1>
                        <h2 className='font-medium'>{`#${device.id}`}</h2>
                        <div className='flex flex-row justify-end w-full'>
                            <DeviceCardMenu device={device}/>
                        </div>
                    </div>
    
                    <h2 className='text-lg font-normal'>{`#Monitoring: ${device.monitor}`}</h2>
                    
                    <div className='flex flex-row justify-center w-full pt-[1rem] space-x-[3rem]'>
                        <ReactSpeedometer
                                width={250}
                                height={250} 
                                minValue={0} 
                                maxValue={1} 
                                needleHeightRatio={0.8}
                                ringWidth={15}
                                segments={2}
                                value={deviceData[0].level ? 1 : 0}
                                segmentColors={[
                                    "#ec5555",
                                    "#7ab55c",
                                ]}
                                needleColor="#000080"
                                currentValueText='Water Level: ${value}'
                        />
                        
                        {deviceData[0].ppm != Number.NaN ? (
                            <ReactSpeedometer
                                width={250}
                                height={250} 
                                minValue={0}
                                maxValue={1200}
                                needleHeightRatio={0.8}
                                ringWidth={15}
                                segments={6}
                                value={deviceData[0].ppm}
                                segmentColors={[
                                    "#7ab55c",
                                    
                                ]}
                                needleColor="#000080"
                                currentValueText='PPM: ${value}'
                            />
                        ):(<></>)}

                         {deviceData[0].temp != Number.NaN ? (
                              <ReactSpeedometer
                              width={250}
                              height={250} 
                              minValue={0}
                              maxValue={100}
                              needleHeightRatio={0.8}
                              ringWidth={15}
                              segments={10}
                              value={deviceData[0].temp}
                              segmentColors={[
                                  "#ec5555",
                                  "#ec5555",
                                  "#ec5555",
                                  "#ec5555",
                                  "#ec5555",
                                  "#ec5555",
                                  "#f2db5b",
                                  "#7ab55c",
                                  "#f2db5b",
                                  "#ec5555"
                              ]}
                              needleColor="#000080"
                              currentValueText='Temperature(F): ${value}'
                          />
                         ): (<></>)}
                    </div>

                    {deviceData.length > 0 ? 
                        (
                            <div></div>
                        ) : (
                            <p className='text-center text-[2rem]'>No Data</p>
                        )
                    }
              
                </div>
            </div>
        )
    } else {
        return (
            <div className={`flex flex-col justify-center items-center ${deviceData.length > 0 ? 'min-w-fit': 'min-w-[34rem]'} min-h-fit rounded-[2rem] bg-[#FFFFFF] border-2 border-[#D7D9DE]`}>
                <div className={`flex flex-col justify-center w-full ${deviceData.length > 0 ? 'pt-[4.3rem]': 'py-[3rem]'}  px-[3rem] space-y-[1rem]`}>
                    <div className='flex flex-row items-center w-full h-fit space-x-[1rem]'>
                        <h1 className='text-4xl text-[#9CBA96] font-bold'>
                            {device.name}
                        </h1>
                        <h2 className='font-medium'>{`#${device.id}`}</h2>
                        <div className='flex flex-row justify-end w-full'>
                            <DeviceCardMenu device={device}/>
                        </div>
                    </div>
    
                    <h2 className='text-lg font-normal'>{`#Monitoring: ${device.monitor}`}</h2>                
                    <p className='text-center text-[2rem]'>No Data</p>
                </div>
            </div>
        )

    }
   
}

export default DeviceDataCard