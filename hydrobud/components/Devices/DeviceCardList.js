import React, { useState } from 'react'
import Image from 'next/image'

// importing custom components
import DeviceCard from "./DeviceCard"
import SearchBar from "../SearchBar"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import { useAuthContext } from '../../context/AuthContext'

const DeviceCardList = ({devices}) => {
    const [inputText, setInputText] = useState("");
    const {currentUser} = useAuthContext()
    // let inputHandler = (event) => {
    //   //convert input text to lower case
    //   const lowerCase = event.target.value.toLowerCase();
    //   setInputText(lowerCase);

    //   console.log(event.target.value.length || event.target.value === '')
    //   if (event.target.value.length > 0){
    //     setDevicesSearchResult([])
    //   } else {
    //   }

    // };

    const [devicesSearchResult, setDevicesSearchResult] = useState([]);

    // const onSearchHandler = (event) => {
    //     const filteredData = devices.filter((device) => {
    //         //if no input the return the original
    //         if ((device.name.toLowerCase()) === inputText) {
    //             return device;
    //         }
    //     })

    //     setDevicesSearchResult(filteredData)
        
    //     console.log(filteredData)
    // }

    const searchBarStyle = {
        // width: '200px',
        border: "2px solid #7A7A7A",
    }

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        setDevicesSearchResult(results)
        console.log(string, results)
      }
    
    //   const handleOnHover = (result) => {
    //     // the item hovered
    //     console.log(result)
    //   }
    
      const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
        setDevicesSearchResult([item])
      }
    
    //   const handleOnFocus = () => {
    //     console.log('Focused')
    //   }
    
      const formatResult = (item) => {
        return (
          <>
            <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
          </>
        )
      }

      console.log(currentUser)

    return (
        <div className='flex flex-col w-[38rem] h-full items-center space-y-[3rem] pt-[4rem] pb-[2rem] bg-[#F0F0F0]'>
                     {/* <SearchBar devices={devices}/> */}
                <div className='text-[3rem] font-semibold'>Your Devices</div>
                <div className='w-full'>
                     <ReactSearchAutocomplete
                        items={devices}
                        onSearch={handleOnSearch}
                        // onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        // onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                        style={searchBarStyle}
                    />
                </div>
            
            {/* <div className={`flex flex-row w-full h-[4rem] bg-[#FFFFFF] items-center rounded-[1rem] border-[0.13rem] border-[#7A7A7A] focus:outline-none`}>
                <input
                    name='search'
                    type='text'
                    className='w-full h-full mx-[1rem] bg-transparent text-[1.5rem] focus:outline-none'
                    value={inputText}
                    onChange={inputHandler}
                />
                <button 
                    className='relative w-[3.4rem] h-[3.4rem] mr-[1rem]' 
                    onClick={onSearchHandler}
                >
                    <Image   
                        src='/images/search.svg'
                        layout='fill'
                        alt='eye'
                    />
                </button>
            </div> */}
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