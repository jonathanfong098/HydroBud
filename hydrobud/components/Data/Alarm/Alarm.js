import { Disclosure } from '@headlessui/react'
import { toggleAlarm } from '../../../services/firebase/alert'

const Alarm = ({deviceID, alarm}) => {
    const toggleAlarmHandler = async (event) => {
        try {
            await toggleAlarm(deviceID, alarm.id, alarm.on)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    return (
        <>
        <Disclosure>
            <>
                <Disclosure.Button className="flex px-[1rem] py-[1rem] rounded-[1rem] bg-[#B6CB9E] hover:bg-[#9CBA96]">
                <span className='text-[1rem] text-white font-medium'>{alarm.name}</span>
                </Disclosure.Button>
                    {/* <div className='flex w-full  items-center'> */}
                <Disclosure.Panel className="flex justify-center max-w-[30rem] px-[1rem] py-[0.5rem] text-[1rem] text-gray-500 text-justify ">
                    
                        <div className='flex flex-col items-center justify-center'>
                            {alarm.description}
                            <div className='flex flex-row items-center space-x-[4rem]'>
                            <button 
                                // className={`min-w-fit min-h-fit py-[1rem] px-[1.8rem] bg-[#B6CB9E] font-semibold text-white text-3xl rounded-[2rem] ${isDisabled ? '' : 'hover:bg-[#9CBA96]'}`}
                                className={`w-fit h-fit py-[0.6rem] px-[0.8rem] bg-[#B6CB9E] font-semibold text-white text-[1rem] rounded-[1em] hover:bg-[#9CBA96]`}
                                onClick={toggleAlarmHandler}
                                // disabled={isDisabled}
                            >
                                Dismiss
                            </button>
                            <button 
                                // className={`min-w-fit min-h-fit py-[1rem] px-[1.8rem] bg-[#B6CB9E] font-semibold text-white text-3xl rounded-[2rem] ${isDisabled ? '' : 'hover:bg-[#9CBA96]'}`}
                                className={`w-fit h-fit py-[0.6rem] px-[0.8rem] bg-[#B6CB9E] font-semibold text-white text-[1rem] rounded-[1em] hover:bg-[#9CBA96]`}
                                // onClick={onClickHandler}
                            >
                                Delete
                            </button>
                            </div>
                        </div>
                </Disclosure.Panel>
                {/* </div> */}
            </>
        </Disclosure>
        </>

    )
}

export default Alarm
