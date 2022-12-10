import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ReactSpeedometer from 'react-d3-speedometer'

import { createDeviceDataListener } from '../../services/firebase/devices';
import { createAlarmsListener, setOffAlarm } from '../../services/firebase/alert';

// importing custom components
import DataCardMenu from './DataCardMenu';

// importing custom context 
import { useAuthContext } from '../../context/AuthContext';

const DeviceDataCard = ({device}) => {
    const {currentUser} = useAuthContext()

    const [deviceData, setDeviceData] = useState([])
    const [deviceAlarms, setDeviceAlarms] = useState([])
    
    useEffect(() => {
        const unsubscribeDeviceData = createDeviceDataListener(device.id, setDeviceData)
        const unsubscribeAlarms = createAlarmsListener(device.id, setDeviceAlarms)
    }, [])

    useEffect(() => {
        for (const alarm of deviceAlarms){
            if (!alarm.on){
                if (!alarm.on){
                    if (alarm.type === 'ppm'){
                        setOffAlarm(alarm, deviceData[0].ppm, device, currentUser.uid)
                    } else if (alarm.type ==='temp'){
                        setOffAlarm(alarm, deviceData[0].temp, device, currentUser.uid)
                    } else if (alarm.type === 'level'){
                        setOffAlarm(alarm, deviceData[0].level, device, currentUser.uid)
                    } else {
                        return 
                    }
                } else {
                    return 
                }
            }
        }
    }, [deviceData])
    
    if (deviceData.length > 0) {
        return (
            <div 
                className={`flex flex-col justify-center items-center ${deviceData.length > 0 ? 'min-w-fit': 'min-w-[34rem]'} min-h-fit rounded-[2rem] bg-[#FFFFFF] border-2 border-[#D7D9DE] shadow-md`}
                id={`device-data-${device.id}`}
            >
                <div className={`flex flex-col justify-center w-full ${deviceData.length > 0 ? 'pt-[3rem]': 'py-[3rem]'}  px-[3rem] space-y-[1rem]`}>
                    <div className='flex flex-row items-center w-full h-fit space-x-[1rem]'>
                        <h1 className='text-4xl text-[#9CBA96] font-bold'>
                            {device.name}
                        </h1>
                        <h2 className='font-medium'>{`#${device.id}`}</h2>
                        <div className='flex flex-row justify-end w-full'>
                            <DataCardMenu device={device} deviceData={deviceData}/>
                        </div>
                    </div>
    
                    <h2 className='text-lg font-normal'>{`#Monitoring: ${device.monitor}`}</h2>
                    {/* <h2 className='text-lg font-normal'>{`#Updated: ${deviceData[0]?.timestamp.toDate().toDateString()}`}</h2> */}
                    
                    <div className='flex flex-row justify-center w-full pt-[1rem] space-x-[3rem] h-[11rem]'>
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
                                    '#ec5555',
                                    '#7ab55c',
                                ]}
                                needleColor='#000080'
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
                                    '#7ab55c',
                                    
                                ]}
                                needleColor='#000080'
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
                                  '#ec5555',
                                  '#ec5555',
                                  '#ec5555',
                                  '#ec5555',
                                  '#ec5555',
                                  '#ec5555',
                                  '#f2db5b',
                                  '#7ab55c',
                                  '#f2db5b',
                                  '#ec5555'
                              ]}
                              needleColor='#000080'
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

                    <div className='flex justify-center pb-[3rem]'>
                        <Link 
                            href={`/devices#device-${device.id}`}
                            className='min-w-fit py-[0.6rem] px-[1.4rem] bg-[#B6CB9E] hover:bg-[#9CBA96] text-white text-lg font-semibold rounded-[2rem]'
                            scroll={false}
                        >
                            View Device
                        </Link>
                    </div>
              
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
                            <DataCardMenu device={device}/>
                        </div>
                    </div>
    
                    <h2 className='text-lg font-normal'>{`#Monitoring: ${device.monitor}`}</h2>                
                    <p className='text-center text-[2rem]'>No Data</p>
                    <div className='flex justify-center'>
                        <Link 
                            href={`/devices#device-${device.id}`}
                            className='min-w-fit py-[0.6rem] px-[1.4rem] bg-[#B6CB9E] hover:bg-[#9CBA96] text-white text-lg font-semibold rounded-[2rem]'
                            scroll={false}
                        >
                            View Device
                        </Link>
                    </div>
                </div>
            </div>
        )

    }
   
}

export default DeviceDataCard