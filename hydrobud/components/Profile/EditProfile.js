import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/router'

import { addDataToDevice } from '../../services/firebase/devices'
import { validatePpm, validateTemperature } from '../../utils/validateInput'
import { validateUsername } from '../../utils/validateInput'
import { getUser, creteUserListener, updateUser} from '../../services/firebase/firebase-auth'
import { uploadImageToHydrobudMedia } from '../../services/s3'
import { objectIsEmpty } from '../../utils/helper'

// importing custom components
import Button from '../Button'
import Input from '../Input'
import Toggle from '../Toggle'
import Alert from '../Alert'

// importing custom context 
import { useAuthContext } from '../../context/AuthContext'

// importing custom hooks
import useAlert from '../../hooks/use-alert'
import useInput from '../../hooks/use-input'

const EditProfile = ({isOpen, closeModal}) => {
    const { currentUser } = useAuthContext()

    const {
        inputState: usernameState, 
        dispatchInput: dispatchUsername,
        touchValueInput: touchUsernameInput,
        valueInputIsInvalid: usernameInputIsInvalid
    } = useInput(validateUsername)
    const {value: username, valueIsValid: usernameIsValid, errorMessage: usernameError} = usernameState
    const usernameChangeHandler = (event) => {
        dispatchUsername({type:'USER_INPUT', value: event.target.value})
        touchUsernameInput()
    }

    const [selectedImage, setSelectedImage] = useState({})

    const selectImageHandler = (event) => {
        event.preventDefault()

        if (event.target.files){
            const file = event.target.files[0]
            if (file){
                const imagePath = URL.createObjectURL(file)
                const image = {
                    file: file,
                    path: imagePath
                }
                setSelectedImage(image)
            }
        }
    }

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const user = await getUser(currentUser.uid)
                dispatchUsername({type:'USER_INPUT', value: user.username})
                setSelectedImage({file: null, path: user.imageURI})
                
            } catch (error) {
                console.log(error)
            }
        }

        getCurrentUser()
    }, [isOpen])

    const updateUserHandler = async (event) => {
        event.preventDefault()

        let imageURI = ''
        if (!objectIsEmpty(selectedImage)) {
            console.log('selectedImage.file: ', selectedImage.file)
            const imageData = await uploadImageToHydrobudMedia(selectedImage.file)
            if (imageData) {
                imageURI = imageData.uri
                // console.log(image)
            }
        }

        const userData = {
            username: username,
            imageURI: imageURI
        }
        console.log(userData)

        try {
            await updateUser(currentUser.uid, userData)
        } catch (error) {
            console.log(error)
        } finally {
            closeModal()
        }
    }

    return (
        <>
             {/* <Alert 
                isOpen={alertIsOpen} 
                closeModal={closeAddDataModal} 
                isAlert={true} 
                alertType={alertType} 
                modalTitle={alertType} 
                alertMessage={alertMessage}
            /> */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                    <form 
                        className='flex min-h-full items-center justify-center'
                        onSubmit={updateUserHandler}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='flex flex-col w-[38rem] px-[3rem] py-[2rem] space-y-[1rem] rounded-[1.5rem] bg-[#F0F0F0] text-left shadow-xl transition-all'>
                                <div className='flex flex-row w-full'>
                                    <label htmlFor="profile-picture" className='relative flex justify-center items-center w-[7rem] h-[7rem] rounded-full cursor-pointer'>
                                        <img 
                                            src={selectedImage.path} 
                                            className='absolute w-[7rem] h-[7rem] rounded-full'
                                        />
                                        <img 
                                            src={`/images/image_picture_select.svg`} 
                                            className='absolute w-[2rem] h-[2rem] rounded-full'
                                        />
                                        <input id='profile-picture' type='file' className='hidden' onChange={selectImageHandler}/>
                                    </label>
                                    
                                    <div className='w-3/4 ml-[2rem]'>
                                        <Input 
                                            label={'Username'}
                                            name={'username'}
                                            value={username} 
                                            onChangeHandler={usernameChangeHandler}
                                            valueInputIsInvalid={usernameInputIsInvalid}
                                            valueError={usernameError}
                                        />
                                    </div>
                                   
                                </div>
                                

                                {/* <Input 
                                    id='description'
                                    label={'Bio'}
                                    isTextArea={true}
                                    // value={description} 
                                    // onChangeHandler={descriptionChangeHandler}
                                    // valueInputIsInvalid={!descriptionIsValid}
                                    // valueError={descriptionError}
                                /> */}
                          
                          
                                <div className='flex justify-center pt-[1rem]'>
                                    <Button
                                        onClickHandler={updateUserHandler}
                                        isDisabled={!usernameIsValid}
                                        colors = {{bgColor: 'B6CB9E', hoverBgColor: '9CBA96'}}
                                    >
                                        Update Profile
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </form>
                </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default EditProfile