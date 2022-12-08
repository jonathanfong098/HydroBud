import { Disclosure } from '@headlessui/react'

const Notification = ({message, description}) => {
  return (
      <>
        <Disclosure>
            <>
              <Disclosure.Button className="flex w-full px-[1rem] py-[1rem] rounded-[1rem] bg-[#B6CB9E] hover:bg-[#9CBA96]">
                <span className='text-[1rem] font-medium'>{message}</span>
              </Disclosure.Button>
              <div className='flex w-full justify-center items-center'>
                <Disclosure.Panel className="px-[2rem] text-[1rem] text-gray-500 text-justify ">
                  {description}
                  
                </Disclosure.Panel>
              </div>
            </>
        </Disclosure>
      </>

  )
}

export default Notification
