import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
]

export default function SearchBar({devices}) {
  const [selectedDevices, setSelectedDevices] = useState([])
  console.log(selectedDevices)
  const [query, setQuery] = useState('')

  const filteredDevices =
    query === ''
      ? []
      : devices.filter((device) =>
        device.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
    )

  return (
    <div className='relative w-full'>
      <Combobox value={selectedDevices} onChange={setSelectedDevices} nullable>
        {/* <div className="relative mt-1"> */}
          <div className="flex flex-row w-full h-[4rem] bg-[#FFFFFF] items-center rounded-[1rem] border-[0.13rem] border-[#7A7A7A] focus:outline-none shadow-md">
            <Combobox.Input
              className="w-full h-full mx-[1rem] bg-transparent text-[1.5rem] focus:outline-none"
              displayValue={(device) => device?.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button 
                className='min-w-fit min-h-fit pr-[1rem]' 
                // onClick={onSearchHandler}
            >
                <img   
                    src='/images/search.svg'
                    alt='search'
                    className='w-[3rem] h-[3rem]'
                />
            </button>
            {/* <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2"> */}
              {/* <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              /> */}
            {/* </Combobox.Button> */}
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <div className='pt-[0.2rem]'>
            <Combobox.Options className="flex flex-col items-center absolute space-y-[0.5rem] w-full min-h-fit py-[2rem] rounded-[1rem] bg-[#FFFFFF] border-2 border-[#7A7A7A] shadow-md'">
              {filteredDevices.length === 0 && query !== '' ? (
                <div className='select-none text-black'>
                  Nothing found.
                </div>
              ) : (
                filteredDevices.map((device) => (
                  <Combobox.Option
                    key={device.id}
                    className={({ active }) =>
                      `relative select-none w-5/6 text-center rounded-[1rem] ${
                        active ? 'bg-[#9CBA96] text-white' : 'text-gray-900'
                      }`
                    }
                    value={device}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`text-[1.5rem] ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {device.name}
                        </span>
                        {/* {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null} */}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
            </div>
          </Transition>
        {/* </div> */}
      </Combobox>
     </div>
  )
}
