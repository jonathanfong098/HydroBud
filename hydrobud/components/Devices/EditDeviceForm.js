import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { serverTimestamp } from 'firebase/firestore'

import { validateDeviceName, validateDeviceMonitor, validateDeviceDescription} from '../../utils/validateInput'
import { createDeviceListener, updateDevice } from '../../services/firebase/devices'
import { uploadImageToHydrobudMedia } from '../../services/s3'

// importing custom components 
import Input from '../Input'
import Button from '../Button'
import Toggle from '../Toggle'
import Alert from '../Alert'

// importing custom hooks
import useInput from '../../hooks/use-input'
import useAlert from '../../hooks/use-alert'

// importing custom context
import { useAuthContext } from '../../context/AuthContext'


const EditDeviceForm = ({deviceID}) => {
    const { currentUser, initializing } = useAuthContext()

    const {
        inputState: nameState, 
        dispatchInput: dispatchName, 
        touchValueInput: touchNameInput,
        valueInputIsInvalid: nameInputIsInvalid
    } = useInput(validateDeviceName)
    const {value: name, valueIsValid: nameIsValid, errorMessage: nameError} = nameState
    const nameChangeHandler = (event) => {
        dispatchName({type:'USER_INPUT', value: event.target.value})
        touchNameInput()
    }

    const {
        inputState: monitorState, 
        dispatchInput: dispatchMonitor,
        touchValueInput: touchMonitorInput,
        valueInputIsInvalid: monitorInputIsInvalid
    } = useInput(validateDeviceMonitor)
    const {value: monitor, valueIsValid: monitorIsValid, errorMessage: monitorError} = monitorState
    const monitorChangeHandler = (event) => {
        dispatchMonitor({type:'USER_INPUT', value: event.target.value})
        touchMonitorInput()
    }

    const [description, setDescription] = useState('')
    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value)
    }
    const {valueIsValid: descriptionIsValid, errorMessage: descriptionError } = validateDeviceDescription(description)


    const [selectedImage, setSelectedImage] = useState({file: null, path: null})


    const [ppmMetricEnabled, setPpmMetricEnabled] = useState(true)
    const [tempMetricEnabled, setTempMetricEnabled] = useState(true)
    const [levelMetricEnabled, setLevelMetricEnabled] = useState(true)

    const [initialDeviceData, setInitialDeviceData] = useState()
    useEffect(() => {
        const unsubscribeDevice = createDeviceListener(deviceID, setInitialDeviceData)
    }, [])

    useEffect(() => {
        if (initialDeviceData) {
            dispatchName({type:'USER_INPUT', value: initialDeviceData.name})
            dispatchMonitor({type:'USER_INPUT', value: initialDeviceData.monitor})
            setDescription(initialDeviceData.description)
            setSelectedImage({file: null, path: initialDeviceData.imageURI})
            if (!initialDeviceData.metrics.includes('ppm')){
                setPpmMetricEnabled(false)
            } 
            if (!initialDeviceData.metrics.includes('temp')) {
                setTempMetricEnabled(false)
            } 
            if (!initialDeviceData.metrics.includes('level')) {
                setLevelMetricEnabled(false)
            }
        }
    }, [initialDeviceData])

    const {alertIsOpen, openAlert, closeAlert, alertMessage, setAlertMessage} = useAlert()
    const [alertType, setAlertType] = useState('')  

    const formIsValid = nameIsValid && monitorIsValid && descriptionIsValid 
    
    const metricOptionsAreValid = ppmMetricEnabled || tempMetricEnabled || levelMetricEnabled

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

    const updateDeviceHandler = async (event) => {
        event.preventDefault()
        
        try {
            let imageURI = initialDeviceData.imageURI
            if (selectedImage.file) {
                const imageData = await uploadImageToHydrobudMedia(selectedImage.file)
                if (imageData) {
                    imageURI = imageData.uri
                }
            }
    

            const metricsArray = []
            if (ppmMetricEnabled) {
                metricsArray.push('ppm')
            }  
            if (tempMetricEnabled) {
                metricsArray.push('temp')
            } 
            if (levelMetricEnabled) {
                metricsArray.push('level')
            }
            
            const deviceData = {
                name: name,
                monitor: monitor,
                description: description,
                imageURI: imageURI,
                metrics: metricsArray,
            }

            await updateDevice(deviceID, deviceData)
            setAlertType('success')
            setAlertMessage(`Updated device`)
        } catch (error) {
            setAlertType('error')
            setAlertMessage('Failed to update device')
        } finally {
            openAlert()
        }
    }

    return (
        <>
            <Alert 
                isOpen={alertIsOpen} 
                closeModal={closeAlert} 
                isAlert={true} 
                alertType={alertType} 
                modalTitle={alertType} 
                alertMessage={alertMessage}
            />
            <form 
                className='flex flex-col min-w-fit items-center space-y-[4.5rem] pt-[3rem] pb-[2rem]'
                onSubmit={updateDeviceHandler}
            >
                <div className='flex flex-row justify-center items-center w-full space-x-[0.8rem]'>
                    <label className='text-[2rem] font-semibold'>Device ID: </label>
                    <div className='flex flex-row items-center min-w-fit h-[4rem] px-[1rem] rounded-[1rem] border-[0.13rem] border-[#D7D9DE] bg-[#D7D9DE]'>
                        <p className='text-[1.5rem]'>{deviceID}</p>
                    </div>
                </div>
                <div className='flex flex-row space-x-[5rem]'>
                    <Input 
                        label={'Name'}
                        name={'device_name'}
                        value={name} 
                        onChangeHandler={nameChangeHandler}
                        valueInputIsInvalid={nameInputIsInvalid}
                        valueError={nameError}
                    />

                    <Input 
                        label={'Monitoring'}
                        name={'monitor'}
                        value={monitor} 
                        onChangeHandler={monitorChangeHandler}
                        valueInputIsInvalid={monitorInputIsInvalid}
                        valueError={monitorError}
                    />
                </div>

                <div className='w-full'>
                    <Input 
                        id='description'
                        label={'Description'}
                        isTextArea={true}
                        value={description} 
                        onChangeHandler={descriptionChangeHandler}
                        valueInputIsInvalid={!descriptionIsValid}
                        valueError={descriptionError}
                    />
                </div>

                <label 
                    htmlFor='device_picture' 
                    className='flex justify-center items-center relative w-[20rem] h-[20rem] rounded-[1rem] bg-[#FFFFFF] hover:bg-[#ebebeb] hover:border-[0.13rem] hover:border-[#7A7A7A]'
                >
                    <img 
                        src={selectedImage.path} 
                        className='absolute w-full h-full rounded-[1rem]'
                    />
                    <div className='relative w-[6rem] h-[6rem]'>
                        <Image   
                            src='/images/image_picture_select.svg'
                            layout='fill'
                            alt='select_image'
                        />
                    </div>
                    <input 
                        id='device_picture' 
                        type='file' 
                        className='hidden' 
                        onChange={selectImageHandler}
                    />
                </label>

                <div className='flex flex-row w-full justify-between'>
                    <Toggle 
                        label={'PPM'}
                        enabled={ppmMetricEnabled}
                        setEnabled={setPpmMetricEnabled}
                    />
                    <Toggle 
                        label={'Temp'}
                        enabled={tempMetricEnabled}
                        setEnabled={setTempMetricEnabled}
                    />
                    <Toggle 
                        label={'Level'}
                        enabled={levelMetricEnabled}
                        setEnabled={setLevelMetricEnabled}
                    />
                </div>
                {!metricOptionsAreValid && (<div className='text-[1rem] text-[#EE392F] ml-[1rem]'>{'At least one metric must be enabled'}</div>)}


                <Button
                    onClickHandler={updateDeviceHandler}
                    isDisabled={!formIsValid}
                    colors = {{bgColor: 'B6CB9E', hoverBgColor: '9CBA96'}}
                >
                    Update Device
                </Button>
            </form>
        </>
    )
}

export default EditDeviceForm