import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

export const comparisons = [
  {name: 'Greater'},
  {name: 'Greater/Equal'},
  {name: 'Lower/Equal'},
  {name: 'Lower'},
]

const Comparison = ({comparison, setComparison}) => {
  return (
    <RadioGroup 
        value={comparison} 
        onChange={setComparison} 
        className='flex flex-row space-x-[1rem]'
    >
      {/* <RadioGroup.Label>Plan</RadioGroup.Label> */}
      {/* <RadioGroup.Option value="startup">
        {({ checked }) => (
          <span className={checked ? 'bg-blue-200 cursor-pointer' : 'cursor-pointer'}>Startup</span>
        )}
      </RadioGroup.Option> */}
      {comparisons.map((comparison) => (
        // <RadioGroup.Option 
        //   key={comparison.name} 
        //   value={comparison.name} 
        //   className='min-w-fit min-h-fit bg-white border-[#B6CB9E] border-2 p-[0.5rem] rounded-[1rem]'
        // >
        //    {({ checked }) => (
        //     <div className={checked ? 'w-full h-full bg-[#B6CB9E] cursor-pointer focus: outline-none:' : 'cursor-pointer'}>{comparison.name}</div>
        //   )}
        // </RadioGroup.Option>
        <RadioGroup.Option
                key={comparison.name}
                value={comparison.name}
                className={({ active, checked }) =>
                  `
                  ${
                    checked ? 'bg-[#B6CB9E] text-white' : 'bg-white'
                  }
                    cursor-pointer rounded-[1rem] p-[1rem] shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                        <div className="text-[1rem]">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-black'
                            }`}
                          >
                            {comparison.name}
                          </RadioGroup.Label>
                     
                        </div>
                  </>
                )}
          </RadioGroup.Option>
      ))}
    </RadioGroup>
  )
}

export default Comparison