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
      {comparisons.map((comparison) => (
        <RadioGroup.Option
                key={comparison.name}
                value={comparison.name}
                className={({ checked }) =>
                  `
                  ${
                    checked ? 'bg-[#B6CB9E] text-white' : 'bg-white'
                  }
                    cursor-pointer rounded-[1rem] p-[1rem] shadow-md focus:outline-none`
                }
              >
                {({ checked }) => (
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