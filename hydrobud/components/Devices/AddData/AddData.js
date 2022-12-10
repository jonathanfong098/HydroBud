import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { serverTimestamp } from 'firebase/firestore'

import { addDataToDevice, createDeviceDataListener } from '../../../services/firebase/devices'
import { validatePpm, validateTemperature } from '../../../utils/validateInput'

// importing custom components
import Button from '../../Button'
import Input from '../../Input'
import Toggle from '../../Toggle'
import Alert from '../../Alert'
import Level from './Level'
import ToggleMetric from './ToggleMetric'

// importing custom hooks
import useAlert from '../../../hooks/use-alert'
import useInput from '../../../hooks/use-input'


const AddData = ({isOpen, closeModal, deviceID, deviceMetrics}) => {
    const [currentDeviceData, setDeviceData] = useState([])
    useEffect(() => {
        const unsubscribeDeviceData = createDeviceDataListener(deviceID, setDeviceData)
    }, [])

    const [addPpm, setAddPpm] = useState(true)
    const [addTemp, setAddTemp] = useState(true)
    const [addLevel, setAddLevel] = useState(true)

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

    const [isLevel, setIsLevel] = useState('')

    const resetForm = () => {
        dispatchPpm({type:'RESET', value: ''})
        dispatchTemperature({type:'RESET', value: ''})
        setIsLevel('')
        setAddPpm(true)
        setAddTemp(true)
        setAddLevel(true)
    }

    //manage alert state
    const {alertIsOpen, openAlert, closeAlert, alertMessage, setAlertMessage} = useAlert()
    const [alertType, setAlertType] = useState('')  
    const closeAddDataModal = () => {
        resetForm()
        closeModal()
    }

    useEffect(() => {
        dispatchPpm({type:'INITIALIZE', value: '0'})
        dispatchTemperature({type:'INITIALIZE', value: '0'})
    },[isOpen])

    const addDataHandler = async (event) => {
        event.preventDefault()

        console.log('currentDeviceData', currentDeviceData)

        let ppmToAdd = currentDeviceData[0]?.ppm !=null ? currentDeviceData[0].ppm : null
        let tempToAdd = currentDeviceData[0]?.temp != null ? currentDeviceData[0].temp : null
        let levelToAdd = currentDeviceData[0]?.level != null ? currentDeviceData[0].level : null

        if(deviceMetrics.includes('ppm') && addPpm){
            ppmToAdd = parseInt(ppm)
        } 
        if (deviceMetrics.includes('temp') && addTemp) {
            tempToAdd = parseInt(temperature)
        }
        if (deviceMetrics.includes('level') && addLevel){
            if (isLevel === 'Above Water Level'){
                levelToAdd = true
            } else {
                levelToAdd = false
            }
        }

        const deviceData = {
            ppm: ppmToAdd,
            temp: tempToAdd,
            level: levelToAdd,
            timestamp: serverTimestamp()
        }
        console.log('deviceData to submit: ', deviceData)

        try {
            await addDataToDevice(deviceID, deviceData)
            setAlertType('success')
            setAlertMessage(`Added data`)
            // setAddDataAlertMessage(`Added data`)
        } catch (error) {
            // throw error
            setAlertType('error')
            setAlertMessage('Failed to add data')
            // setAddDataAlertMessage('Failed to add data')
        } finally {
            // closeModal()

            resetForm()
            
            // openAddDataAlert()
            // openAlert()
        }

        // unsubscribeDeviceData()
    }

    let formIsValid = addPpm || addTemp || addLevel
    if(deviceMetrics.includes('ppm')){
        formIsValid = formIsValid && ppmIsValid
    } else if (deviceMetrics.includes('temp')) {
        formIsValid = formIsValid && temperatureIsValid
    } else if (deviceMetrics.includes('level')){
        formIsValid = formIsValid && true
    } else {
        formIsValid = formIsValid && ppmIsValid && temperatureIsValid
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
                                <div className='flex flex-col pb-[1.6rem] space-y-[0.8rem]'>
                                    <div className='text-[1rem] font-semibold uppercase text-white bg-[#BAC0D0] rounded-[1rem] p-[1rem] shadow-md'>Toggle metric to include it when adding new data</div>
                                    <div className='flex flex-row place-content-between space-x-[1.5rem]'>
                                        {deviceMetrics.includes('ppm') ? (                                
                                            <ToggleMetric 
                                                label='ppm'
                                                enabled={addPpm}
                                                setEnabled={setAddPpm}
                                            />
                                        ) : (<></>)}
                                        
                                        {deviceMetrics.includes('temp') ? (                                
                                            <ToggleMetric 
                                                label='temp'
                                                enabled={addTemp}
                                                setEnabled={setAddTemp}
                                            />
                                        ) : (<></>)}

                                        {deviceMetrics.includes('level') ? (                                
                                            <ToggleMetric 
                                                label='level'
                                                enabled={addLevel}
                                                setEnabled={setAddLevel}
                                            />
                                        ) : (<></>)}
                                    </div>
                                    {!addPpm && !addTemp && !addLevel ? (
                                        <div className='text-[1rem] text-center uppercase text-[#EE392F]'>Must have one metric selected when adding data</div>)
                                        :(<></>)
                                    }
                                </div>
                              
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
                                        label='Temperature (F)'
                                        inputType='number'
                                        value={temperature}
                                        onChangeHandler={temperatureChangeHandler}
                                        valueInputIsInvalid={temperatureInputIsInvalid}
                                        valueError={temperatureError}
                                    />
                                ) : (<></>)}
                               
                                {deviceMetrics.includes('level') ? (
                                    <div className='flex flex-row py-[1rem]'>
                                        <Level
                                            isLevel={isLevel}
                                            setIsLevel={setIsLevel}
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