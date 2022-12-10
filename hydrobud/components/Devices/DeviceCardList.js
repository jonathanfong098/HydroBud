import React, { useState } from 'react'

// importing custom components
import DeviceCard from "./DeviceCard"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const DeviceCardList = ({devices}) => {
    const [devicesSearchResult, setDevicesSearchResult] = useState([]);

    const searchBarStyle = {
        border: "2px solid #7A7A7A",
    }

    const handleOnSearch = (string, results) => {
        setDevicesSearchResult(results)
    }

    const handleOnSelect = (item) => {
        setDevicesSearchResult([item])
    }
    const formatResult = (item) => {
        return (
            <>
            <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
            </>
        )
    }

    return (
        <div className='flex flex-col w-[41rem] h-full items-center space-y-[3rem] pt-[4rem] pb-[2rem] bg-[#F0F0F0]'>
                <div className='text-[3rem] font-semibold'>Your Devices</div>
                <div className='w-full'>
                     <ReactSearchAutocomplete
                        items={devices}
                        onSearch={handleOnSearch}
                        onSelect={handleOnSelect}
                        autoFocus
                        formatResult={formatResult}
                        style={searchBarStyle}
                        placeholder='Device Name or ID'
                    />
                </div>
            { devicesSearchResult.length > 0 ? (
                devicesSearchResult.map((device) => {
                    return (
                        <DeviceCard 
                            key={device.id} 
                            device={device}
                        />
                    )
                })
            ) : (
                devices.map((device) => {
                    return (
                        <DeviceCard 
                            key={device.id} 
                            device={device}
                        />
                    )
                })
            )
            }
        </div>
    )
}

export default DeviceCardList