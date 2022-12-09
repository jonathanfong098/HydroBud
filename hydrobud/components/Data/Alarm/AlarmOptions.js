import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { serverTimestamp } from 'firebase/firestore'

import { createAlert } from '../../../services/firebase/alert'
import { validatePpm, validateTemperature, validateAlarmName, validateAlarmDescription} from '../../../utils/validateInput'

// importing custom components
import Input from '../../Input'
import Toggle from '../../Toggle'
import Button from '../../Button'
import Comparison from './Comparison'
import Level from '../../Devices/AddData/Level'
import Alert from '../../Alert'

// importing custom hooks
import useInput from '../../../hooks/use-input'
import useAlert from '../../../hooks/use-alert'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AlarmOptions = ({children, deviceID, deviceMetrics, closeModal, setCreatedAlarmMessage, setCreatedAlarmType}) => {
    const [selectedMetric, setSelectedMetric] = useState(deviceMetrics[0])

    const {
        inputState: nameState, 
        dispatchInput: dispatchName, 
        touchValueInput: touchNameInput,
        valueInputIsInvalid: nameInputIsInvalid,
        resetValue: resetName
    } = useInput(validateAlarmName)
    const {value: name, valueIsValid: nameIsValid, errorMessage: nameError} = nameState
    const nameChangeHandler = (event) => {
        dispatchName({type:'USER_INPUT', value: event.target.value})
        touchNameInput()
    }

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

    const [description, setDescription] = useState('')
    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value)
    }
    const {valueIsValid: descriptionIsValid, errorMessage: descriptionError } = validateAlarmDescription(description)

    const [isLevel, setIsLevel] = useState('')

    const [comparison, setComparison] = useState('')

    const resetForm = () => {
        dispatchName({type:'RESET', value: ''})
        setDescription('')
        dispatchPpm({type:'RESET', value: ''})
        dispatchTemperature({type:'RESET', value: ''})
        setIsLevel('')
        setComparison('')
    }

    // const {alertIsOpen: createdAlertIsOpen, openAlert, closeAlert, alertMessage, setAlertMessage} = useAlert()
    // const [alertType, setAlertType] = useState('')  

    const addAlarmHandler = async (event) => {
        event.preventDefault()
        
        const initialAlertData = {
            type: selectedMetric?.toLowerCase(),
            name: name,
            description: description,
            on: false,
            timestamp: serverTimestamp()
        }

        let finalAlertData

        if (selectedMetric === 'ppm'){
            finalAlertData = {...initialAlertData, threshold: parseInt(ppm), comparison: comparison}
        } else if (selectedMetric === 'temp') {
            finalAlertData = {...initialAlertData, threshold: parseInt(temperature), comparison: comparison}
        } else if (selectedMetric === 'level') {
            let levelToAdd
            if (isLevel === 'Above Water Level'){
                levelToAdd = true
            } else {
                levelToAdd = false
            }
            finalAlertData = {...initialAlertData, threshold: levelToAdd}
        } else {
            throw new Error('Invalid Metric')
        }

        console.log('finalAlertData: ', finalAlertData)

        try {
            await createAlert(deviceID, finalAlertData)
            
            // setCreatedAlarmType('success')
            // setAlertType('success')
            // setCreatedAlarmMessage(`Created alert ${name}`)
        } catch (error) {
            // setCreatedAlarmType('error')
            // setCreatedAlarmMessage('Failed to create alert')
            // setAlertType('error')
            // setAlertMessage('Failed to create alert')
        } finally {
            closeModal()
            resetForm()
            // openCreatedAlarm()
        }
    }

    console.log('openCreatedAlarm', setCreatedAlarmMessage)

    const nameAndDescriptionIsValid = (nameIsValid && name != '') && descriptionIsValid
    let formIsValid
    if (selectedMetric === 'ppm') {
        formIsValid = nameAndDescriptionIsValid && ppmIsValid && (comparison != '')
    } else if (selectedMetric === 'temp') {
        formIsValid = nameAndDescriptionIsValid && temperatureIsValid  && (comparison != '')
    } else {
        formIsValid = nameAndDescriptionIsValid
    }

    return (
        <>
        {/* <Alert 
            isOpen={createdAlertIsOpen} 
            closeModal={closeAlert} 
            isAlert={true} 
            alertType={alertType} 
            modalTitle={alertType} 
            alertMessage={alertMessage}
        /> */}
        <div className="w-fit">
        <Tab.Group
            onChange={(index) => {
                console.log('Changed selected tab to:', index)
                setSelectedMetric(deviceMetrics[index])
                resetForm()
              }}
            defaultIndex={deviceMetrics[0]}
        >
            <Tab.List className="flex space-x-[0.4rem] rounded-[1rem] bg-[#BAC0D0] p-[0.5rem]">
            {deviceMetrics.map((deviceMetric) => (
                <Tab
                key={deviceMetric}
                className={({ selected }) =>
                    classNames(
                    'w-full rounded-lg py-[0.5rem] text-[1rem] font-semibold text-white',
                    selected
                        ? 'bg-[#B6CB9E] shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                }
                >
                {deviceMetric.toUpperCase()}
                </Tab>
            ))}
            </Tab.List>
            <Tab.Panels className='my-[1.5rem]'>
                {/* {children} */}
                <div className='space-y-[1rem]'>
                <Input 
                    label={'Alarm Name'}
                    name={'monitor'}
                    value={name} 
                    onChangeHandler={nameChangeHandler}
                    valueInputIsInvalid={nameInputIsInvalid}
                    valueError={nameError}
                />
                <Input 
                    id='description'
                    label={'Description'}
                    isTextArea={true}
                    textAreaHeight={8}
                    value={description} 
                    onChangeHandler={descriptionChangeHandler}
                    valueInputIsInvalid={!descriptionIsValid}
                    valueError={descriptionError}
                />

                {deviceMetrics.includes('ppm') ? (      
                    <Tab.Panel className='space-y-[1rem]'>
                        <Input 
                            label='PPM (mg/L)'
                            inputType='number'
                            value={ppm}
                            onChangeHandler={ppmChangeHandler}
                            valueInputIsInvalid={ppmInputIsInvalid}
                            valueError={ppmError}
                        />
                        <Comparison comparison={comparison} setComparison={setComparison}/>
                    </Tab.Panel>                          
                ) : (<></>)}

                {deviceMetrics.includes('temp') ? (
                    <Tab.Panel className='space-y-[1rem]'>
                        <Input 
                            label='Temperature (F)'
                            inputType='number'
                            value={temperature}
                            onChangeHandler={temperatureChangeHandler}
                            valueInputIsInvalid={temperatureInputIsInvalid}
                            valueError={temperatureError}
                        />
                        <Comparison comparison={comparison} setComparison={setComparison}/>
                    </Tab.Panel>
                    
                ) : (<></>)}

                {deviceMetrics.includes('level') ? (
                    <Tab.Panel className='flex justify-center py-[1rem] w-[29.28rem]'>
                            <Level
                                isLevel={isLevel}
                                setIsLevel={setIsLevel}
                            />
                        {/* <Toggle 
                            label={'Level:'}
                            enabled={isLevel}
                            setEnabled={setIsLevel}
                        /> */}
                    </Tab.Panel>
                ) : (<></>)}
                </div>

                <div className='flex justify-center pt-[3rem]'>
                    <Button
                        onClickHandler={addAlarmHandler}
                        isDisabled={!formIsValid}
                        colors = {{bgColor: 'B6CB9E', hoverBgColor: '9CBA96'}}
                    >
                        Create Alarm
                    </Button>
                </div> 
            </Tab.Panels>
        </Tab.Group>
        </div>
        </>
    )
}

export default AlarmOptions