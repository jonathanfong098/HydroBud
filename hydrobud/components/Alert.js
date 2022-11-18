import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import Emoji from '../Emoji'

const Alert = ({isOpen, closeModal, isError, title, message}) => {
    // custom alert code is from the first example at https://headlessui.com/react/dialog 
    return (
        <>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>
    
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex w-screen h-screen items-center justify-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="flex flex-col justify-center items-center w-[20rem] h-[8rem] rounded-2xl bg-white">
                        <Dialog.Title 
                            as="h3"
                            className={`text-2xl font-[montserrat] font-extrabold ${isError ? 'text-[#EE392F]' : 'text-[#B6CB9E]'} text-center uppercase`}
                        >
                            {title}
                        </Dialog.Title>
                        <div className="mt-4">
                            <p className=" text-center text-[#483D3F] font-[montserrat]">
                                {message}
                            </p>
                        </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )

}

export default Alert