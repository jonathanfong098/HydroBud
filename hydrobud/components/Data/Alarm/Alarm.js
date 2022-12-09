import { Disclosure } from '@headlessui/react'
import { toggleAlarm, deleteAlarm, alarmMessage} from '../../../services/firebase/alert'

const Alarm = ({deviceID, alarm}) => {
    const toggleAlarmHandler = async (event) => {
        try {
            if (alarm.on){
                await toggleAlarm(deviceID, alarm.id, alarm.on)
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const deleteAlarmHandler = async (event) => {
        try { 
            await deleteAlarm(deviceID, alarm.id)
        } catch (error) {
            throw error
        }
    }

    return (
        <>
        <Disclosure as='div'>
            <>
                <Disclosure.Button className={`flex w-full px-[1rem] py-[1rem] rounded-[1rem] ${alarm.on ? 'bg-[#EE392F] hover:bg-[#D81C12]':'bg-[#B6CB9E] hover:bg-[#9CBA96]'}`}>
                    <span className='text-[1rem] text-white font-medium'>{alarmMessage(alarm)}</span>
                </Disclosure.Button>
                <Disclosure.Panel className="flex justify-center max-w-[30rem] px-[1rem] py-[0.6rem] text-[1rem] text-gray-500 text-justify ">
                        <div className='flex flex-col items-center justify-center'>
                            {`Alarm Description: ${alarm.description}`}
                            <div className='flex flex-row items-center space-x-[4rem] mt-[0.28rem]'>
                                <button 
                                    className={`w-fit h-fit py-[0.6rem] px-[0.8rem] font-semibold text-white text-[1rem] rounded-[1em] ${alarm.on ? 'bg-[#EE392F] hover:bg-[#D81C12]':'bg-[#B6CB9E]'}`}
                                    onClick={toggleAlarmHandler}
                                    disabled={!alarm.on}
                                >
                                    Dismiss
                                </button>
                                <button 
                                    // className={`min-w-fit min-h-fit py-[1rem] px-[1.8rem] bg-[#B6CB9E] font-semibold text-white text-3xl rounded-[2rem] ${isDisabled ? '' : 'hover:bg-[#9CBA96]'}`}
                                    className={`w-fit h-fit py-[0.6rem] px-[0.8rem] font-semibold text-white text-[1rem] rounded-[1em] ${alarm.on ? 'bg-[#EE392F] hover:bg-[#D81C12]':'bg-[#B6CB9E] hover:bg-[#9CBA96]'}`}
                                    onClick={deleteAlarmHandler}
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
