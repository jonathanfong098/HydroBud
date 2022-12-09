import { Disclosure } from '@headlessui/react'
import { deleteNotification } from '../../services/firebase/firebase-auth'

const Notification = ({id, userID, message, description}) => {
  const deleteNotificationHandler = (event) => {
    deleteNotification(userID, id)
  }

  return (
      <>
        <Disclosure>
            <>
              <Disclosure.Button className="flex w-full px-[1rem] py-[1rem] rounded-[1rem] bg-[#B6CB9E] hover:bg-[#9CBA96]">
                <span className='text-[1rem] font-medium'>{message}</span>
              </Disclosure.Button>
              <div className='flex w-full justify-center items-center'>
                <Disclosure.Panel className="px-[2rem] text-[1rem] text-gray-500 text-justify ">
                  <div className='flex flex-col items-center'>
                    {description}
                    <button 
                        className={`w-fit h-fit py-[0.6rem] px-[0.8rem] font-semibold text-white text-[1rem] rounded-[1em] bg-[#B6CB9E] hover:bg-[#9CBA96]`}
                        onClick={deleteNotificationHandler}
                    >
                        Dismiss
                    </button>
                  </div>
                </Disclosure.Panel>
              </div>
            </>
        </Disclosure>
      </>

  )
}

export default Notification
