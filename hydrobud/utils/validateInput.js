import { includesUppercaseLetter, includesLowercaseLetter, includesSpecialCharacter, includesWhitespace, validEmail } from './helper'

const validateEmail = (value) => {
    let emailIsValid = false
    let errorMessage = ''

    const emailIsEmpty = value.trim() == ''

    if (emailIsEmpty) {
        errorMessage = 'Email cannot be empty'
    } else if (!validEmail(value)) {
        errorMessage = 'Email is not valid'
    } else {
        emailIsValid = true
    }

    return {
        valueIsValid: emailIsValid,
        errorMessage: errorMessage
    }
}

const validateUsername = (value) => {
    let usernameIsValid = false
    let errorMessage = ''

    const usernameIsEmpty = value.trim() == ''

    if (usernameIsEmpty) {
        errorMessage = 'Username cannot be empty'
    } else if (includesWhitespace(value)) {
        errorMessage = 'Username should not include whitespace'
    } else if (value.length > 30) {
        errorMessage = 'Username should not be longer than 30 characters'
    } else {
        usernameIsValid = true
    }
    
    return {
        valueIsValid: usernameIsValid,
        errorMessage: errorMessage
    }
}

const validatePassword = (value) => {
    let passwordIsValid = false
    let errorMessage = ''

    const passwordIsEmpty = value.trim() == ''

    if (passwordIsEmpty) {
        errorMessage = 'Password cannot be empty'
    } else if (value.length < 8) {
        errorMessage = 'Password needs to be longer than 8 characters'
    } else if (!includesUppercaseLetter(value)){
        errorMessage = 'Password needs to include a uppercase letter'
    } else if (!includesLowercaseLetter(value)) {
        errorMessage = 'Password needs to include a lowercase letter'
    } else if (!includesSpecialCharacter(value)) {  
        errorMessage = 'Password needs to include a special character'
    } else {
        passwordIsValid = true
    }
    
    return {
        valueIsValid: passwordIsValid,
        errorMessage: errorMessage
    }
}

const validateConfirmPassword = (valueToCheck, valueToCheckAgainst) => {
    let confirmPasswordIsValid = false
    let errorMessage = ''

    if (valueToCheck === valueToCheckAgainst) {
        confirmPasswordIsValid = true
    } else {
        errorMessage = 'Passwords do not match'
    }
    
    return {
        valueIsValid: confirmPasswordIsValid,
        errorMessage: errorMessage
    }
}

const validateBio = (value) => {
    let biosValid = false
    let errorMessage = ''

    const bioIsEmpty = value.trim() == ''

    if (bioIsEmpty) {
        errorMessage = 'Bio cannot be empty'
    } else if (value.length > 300) {
        errorMessage = 'Bio cannot be longer than 300 characters'
    } else {
        biosValid = true
    }
    
    return {
        valueIsValid: biosValid,
        errorMessage: errorMessage
    }
}

const validateDeviceName = (value) => {
    let deviceNameIsValid = false
    let errorMessage = ''

    const deviceNameIsEmpty = value.trim() == ''

    if (deviceNameIsEmpty) {
        errorMessage = 'Device name cannot be empty'
    } else if (value.length > 50) {
        errorMessage = 'Device name is too long'
    } else {
        deviceNameIsValid = true
    }

    return {
        valueIsValid: deviceNameIsValid,
        errorMessage: errorMessage
    }
}

const validateDeviceMonitor= (value) => {
    let monitorIsValid = false
    let errorMessage = ''

    const deviceMonitoryIsEmpty = value.trim() == ''

    if (deviceMonitoryIsEmpty) {
        errorMessage = 'Items device is monitoring cannot be empty'
    } else if (value.length > 100) {
        errorMessage = 'Items device is monitoring is too long'
    } else {
        monitorIsValid = true
    }

    return {
        valueIsValid: monitorIsValid,
        errorMessage: errorMessage
    }
}


const validateDeviceDescription= (value) => {
    let devicesDescriptionIsValid = false
    let errorMessage = ''

    if (value.length > 300) {
        errorMessage = 'Device description is too long'
    } else {
        devicesDescriptionIsValid = true
    }

    // console.log(errorMessage)

    return {
        valueIsValid: devicesDescriptionIsValid,
        errorMessage: errorMessage
    }
}

const validatePpm= (value) => {
    let ppmIsValid = false
    let errorMessage = ''

    const ppmIsEmpty = value.trim() == ''

    if (ppmIsEmpty) {
        errorMessage = 'PPM cannot be empty'
    } else if (parseInt(value) < 0 || parseInt(value) > 1200) {
        errorMessage = 'PPM has to between 0 and 1200'
    } else {
        ppmIsValid = true
    }

    return {
        valueIsValid: ppmIsValid,
        errorMessage: errorMessage
    }
}

const validateTemperature= (value) => {
    let temperatureIsValid = false
    let errorMessage = ''

    const temperatureIsEmpty = value.trim() == ''

    if (temperatureIsEmpty) {
        errorMessage = 'Temperature cannot be empty'
    } else if (parseInt(value) < 0 || parseInt(value) > 100){
        errorMessage = 'Temperature has to between 0F and 100F'
    } else {
        temperatureIsValid = true
    }

    return {
        valueIsValid: temperatureIsValid,
        errorMessage: errorMessage
    }
}

const validateAlarmName= (value) => {
    let alarmIsValid = false
    let errorMessage = ''

    const usernameIsEmpty = value.trim() == ''

    if (usernameIsEmpty) {
        errorMessage = 'Alarm cannot be empty'
    } else if (value.length > 20) {
        errorMessage = 'Alarm name is too long'
    } else {
        alarmIsValid = true
    }

    return {
        valueIsValid: alarmIsValid,
        errorMessage: errorMessage
    }
}

const validateAlarmDescription = (value) => {
    let alarmDescriptionIsValid = false
    let errorMessage = ''

    if (value.length > 300) {
        errorMessage = 'Alarm description is too long'
    } else {
        alarmDescriptionIsValid = true
    }

    return {
        valueIsValid: alarmDescriptionIsValid,
        errorMessage: errorMessage
    }
}

const emailToShareWith = (value) => {
    let emailToShareWithIsValid = false
    let errorMessage = ''

    if (!validEmail(value) && value != '') {
        errorMessage = 'Email is not valid'
    } else {
        emailToShareWithIsValid = true
    }

    return {
        valueIsValid: emailToShareWithIsValid,
        errorMessage: errorMessage
    }
}



export { 
    validateUsername, 
    validateEmail,
    validatePassword, 
    validateConfirmPassword, 
    validateBio,
    validateDeviceName,
    validateDeviceMonitor,
    validateDeviceDescription,
    validatePpm,
    validateTemperature,
    validateAlarmName,
    validateAlarmDescription,
    emailToShareWith
}

 