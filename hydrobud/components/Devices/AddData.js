import React, { useState } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/router'

import { addDataToDevice } from '../../services/firebase/devices'
import { validatePpm, validateTemperature } from '../../utils/validateInput'

// importing custom components
import Button from '../Button'
import Input from '../Input'
import Toggle from '../Toggle'
import Alert from '../Alert'

// importing custom hooks
import useAlert from '../../hooks/use-alert'

// importing custom hooks
import useInput from '../../hooks/use-input'

const AddData = ({isOpen, closeModal, deviceID, deviceMetrics}) => {
    const router = useRouter()

    const [isLevel, setIsLevel] = useState(true)

    const {
        inputState: ppmState, 
        dispatchInput: dispatchPpm,
        touchValueInput: touchPpmInput,
        untouchValueInput: untouchPpm,
        valueInputIsInvalid: ppmInputIsInvalid,
    } = useInput(validatePpm)
    const {value: ppm, valueIsValid: ppmIsValid, errorMessage: ppmError} = ppmState
    const ppmChangeHandler = (event) => {
        dispatchPpm({type:'USER_INPUT', value: event.target.value})
        touchPpmInput()
    }

    const {
        inputState: temperatureState, 
        dispatchInput: dispatchTemperature,
        touchValueInput: touchTemperatureInput,
        untouchValueInput: untouchTemperatureInput,
        valueInputIsInvalid: temperatureInputIsInvalid
    } = useInput(validateTemperature)
    const {value: temperature, valueIsValid: temperatureIsValid, errorMessage: temperatureError} = temperatureState
    const temperatureChangeHandler = (event) => {
        dispatchTemperature({type:'USER_INPUT', value: event.target.value})
        touchTemperatureInput()
    }

    //manage alert state
    const {alertIsOpen, openAlert, closeAlert, alertMessage, setAlertMessage} = useAlert()
    const [alertType, setAlertType] = useState('')  
    const closeAddDataModal = () => {
        closeModal()

        dispatchPpm({type:'INITIALIZE', value: ''})
        dispatchTemperature({type:'INITIALIZE', value: ''})
        setIsLevel(true)

        untouchPpm()
        untouchTemperatureInput()
    }

    const addDataHandler = async (event) => {
        event.preventDefault()

        const deviceData = {
            ppm: parseInt(ppm),
            temp: parseInt(temperature),
            level: isLevel,
            timestamp: serverTimestamp()
        }
        console.log(deviceData)

        try {
            await addDataToDevice(deviceID, deviceData)
            setAlertType('success')
            setAlertMessage(`Added data`)
            // setAddDataAlertMessage(`Added data`)
        } catch (error) {
            setAlertType('error')
            setAlertMessage('Failed to add data')
            // setAddDataAlertMessage('Failed to add data')
        } finally {
            closeModal()

            setPPM('')
            setTemperature('')
            setIsLevel(true)
            
            // openAddDataAlert()
            openAlert()
        }
    }

    let formIsValid;
    if(deviceMetrics.includes('ppm')){
        formIsValid = ppmIsValid
    } else if (deviceMetrics.includes('temp')) {
        formIsValid = temperatureIsValid
    } else {
        formIsValid = ppmIsValid && temperatureIsValid
    }

    // console.log('device: ', deviceMetrics)
    return (
        <>
             <Alert 
                isOpen={alertIsOpen} 
                closeModal={closeAddDataModal} 
                isAlert={true} 
                alertType={alertType} 
                modalTitle={alertType} 
                alertMessage={alertMessage}
            />
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeAddDataModal}>
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
                        onSubmit={addDataHandler}
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
                            <Dialog.Panel className='flex flex-col min-w-fit px-[3rem] py-[2rem] space-y-[1rem] rounded-[1.5rem] bg-[#F0F0F0] text-left shadow-xl transition-all'>
                                {deviceMetrics.includes('ppm') ? (                                
                                <Input 
                                    label='PPM (mg/L)'
                                    inputType='number'
                                    value={ppm}
                                    onChangeHandler={ppmChangeHandler}
                                    valueInputIsInvalid={ppmInputIsInvalid}
                                    valueError={ppmError}
                                />
                                ) : (<></>)}

                                {deviceMetrics.includes('temp') ? (
                                    <Input 
                                        label='Temperature (C)'
                                        inputType='number'
                                        value={temperature}
                                        onChangeHandler={temperatureChangeHandler}
                                        valueInputIsInvalid={temperatureInputIsInvalid}
                                        valueError={temperatureError}
                                    />
                                ) : (<></>)}
                               
                                {deviceMetrics.includes('temp') ? (
                                    <div className='py-[1rem]'>
                                        <Toggle 
                                            label={'Level:'}
                                            enabled={isLevel}
                                            setEnabled={setIsLevel}
                                        />
                                    </div>
                                ) : (<></>)}
                          
                                <div className='flex justify-center pt-[1rem]'>
                                    <Button
                                        onClickHandler={addDataHandler}
                                        isDisabled={!formIsValid}
                                        colors = {{bgColor: 'B6CB9E', hoverBgColor: '9CBA96'}}
                                    >
                                        Add Data
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

export default AddData