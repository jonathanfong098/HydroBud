import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import Emoji from '../Emoji'

const Alert = ({
  isOpen, 
  closeModal, 
  isAlert, 
  alertType, 
  modalTitle, 
  alertMessage, 
  isConfirm,
  confirmHandler,
  doNotConfirmHandler,
  confirmData
}) => {
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
                  <Dialog.Panel className={`flex flex-col justify-center items-center ${isAlert ? 'w-[20rem] h-[8rem]': ''} ${isConfirm ? 'w-[18rem] h-[10rem]': ''} rounded-[1rem] bg-white`}>
                    {isAlert && (
                      <>
                        <Dialog.Title 
                          as="h1"
                          className={`text-3xl font-[montserrat] font-extrabold ${alertType === 'error' ? 'text-[#EE392F]' : 'text-[#B6CB9E]'} text-center uppercase`}
                        >
                          {modalTitle}
                        </Dialog.Title>
                        <div className="mt-4">
                          <p className=" text-lg text-center text-[#483D3F] font-[montserrat]">
                              {alertMessage}
                          </p>
                        </div>
                      </>
                    )}
              
                    {isConfirm && 
                      (
                        <div className='flex flex-col justify-center items-center w-[15rem]'>
                          <Dialog.Title 
                            as="h1"

                            className={`text-lg font-semibold text-center capitalize`}
                          >
                            {modalTitle}
                          </Dialog.Title>
                          <div className='flex flex-row space-x-[6.5rem] mt-[1rem]'>
                            <button 
                                className={`h-[2.5rem] w-[4rem] bg-[#B6CB9E] font-semibold text-white text-lg rounded-[1rem] hover:bg-[#9CBA96]`}
                                onClick={() => {confirmHandler(confirmData.deviceID)}}
                            >
                                Yes
                            </button>
                            <button 
                                className={`h-[2.5rem] w-[4rem] bg-[#B6CB9E] font-semibold text-white text-lg rounded-[1rem] hover:bg-[#9CBA96]`}
                                onClick={doNotConfirmHandler}
                            >
                                No
                            </button>
                          </div>
                        </div>
                      )
                    }
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