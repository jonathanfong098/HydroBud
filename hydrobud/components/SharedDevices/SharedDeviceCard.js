import React, { useState, useEffect } from 'react'
import ReactSpeedometer from 'react-d3-speedometer'

import { createDeviceDataListener } from '../../services/firebase/devices'
import { getUser as getUserRequest} from '../../services/firebase/firebase-auth'

const SharedDeviceCard = ({device}) => {
    const [deviceData, setDeviceData] = useState([])
    const [deviceOwner, setDeviceOwner] = useState('')

    useEffect(() => {
        if (device) {
            const unsubscribeDeviceData = createDeviceDataListener(device.id, setDeviceData)

            const getUser = async() => {
                const user = await getUserRequest(device.userID)
                setDeviceOwner(user.username)
            }

            getUser()
            .catch(console.error)
        }
    }, [])

    return (
        <div className={`flex flex-col justify-center items-center ${deviceData.length > 0 ? 'w-fit': 'w-[34rem]'} h-fit rounded-[2rem] bg-[#FFFFFF] border-2 border-[#D7D9DE] shadow-md`}>
            <div className={`flex flex-col justify-center w-full ${deviceData.length > 0 ? 'pt-[3rem]': 'py-[3rem]'}  px-[3rem] space-y-[1rem]`}>
                <div className='flex flex-row w-full items-center w-full h-fit space-x-[1rem]'>
                    <h1 className='text-4xl text-[#9CBA96] font-bold'>{device.name}</h1>
                    <div className='flex flex-row w-full justify-end'>
                            <div className='flex h-full w-fit px-[1.6rem] text-right font-semibold text-[#9CBA96]'>Owned By: {deviceOwner}</div>
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

                <div className='flex flex-row justify-center w-full pt-[1rem] space-x-[3rem] h-[14rem]'>
                        {deviceData[0]?.level != null ? (
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
                        ):(<></>)}
                        
                        {deviceData[0]?.ppm !=null ? (
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

                         {deviceData[0]?.temp != null ? (
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
                          >
                            
                          </ReactSpeedometer>
                         ): (<></>)}
                    </div>

                    {deviceData.length > 0 ? 
                        (
                            <></>
                        ) : (
                             <p className='text-center text-[2rem]'>No Data</p>
                        )
                    }
            </div>
        </div>
        
    )
}

export default SharedDeviceCard