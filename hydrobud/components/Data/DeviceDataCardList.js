import React, { useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

// importing custom components
import DeviceDataCard from './DeviceDataCard'

const DeviceDataCardList = ({devices}) => {
    const [devicesSearchResult, setDevicesSearchResult] = useState([])

    const searchBarStyle = {
        border: '2px solid #7A7A7A',
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
        <>
            <div className='h-full w-[38rem] flex flex-col items-center space-y-[3rem] pt-[4rem] pb-[2rem] bg-[#F0F0F0]'>

            <div className='text-[3rem] font-semibold'>Your Device Data</div>
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
                        <DeviceDataCard
                            key={device.id} 
                            device={device}
                        />
                    )
                })
                ) : (
                    devices.map((device) => {
                        return (
                            <DeviceDataCard 
                                key={device.id} 
                                device={device}
                            />
                        )
                    })
                )
                }
            </div>
        </>
    )
}

export default DeviceDataCardList