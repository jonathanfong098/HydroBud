import { RadioGroup } from '@headlessui/react'

export const levelOptions = [
  {name: 'Above Water Level'},
  {name: 'Below Water Level'}
]

const Level = ({isLevel, setIsLevel}) => {
  return (
    <RadioGroup 
        value={isLevel} 
        onChange={setIsLevel} 
        className='flex flex-row w-full space-x-[4rem] justify-center'
    >
      {levelOptions.map((levelOption) => (
        <RadioGroup.Option
                key={levelOption.name}
                value={levelOption.name}
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
                            {levelOption.name}
                          </RadioGroup.Label>
                     
                        </div>
                  </>
                )}
          </RadioGroup.Option>
      ))}
    </RadioGroup>
  )
}

export default Level