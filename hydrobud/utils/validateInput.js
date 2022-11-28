import { includesUppercaseLetter, includesLowercaseLetter, includesSpecialCharacter, includesWhitespace, validEmail } from './helper'

// TODO: generalize validate function
// export const validateValue = (value, validateCallback) => {
//     let valueIsValid = false

//     let error = validateCallback(value, valueIsValid)

//     console.log(valueIsValid, error)

//     return {
//         valueIsValid: valueIsValid,
//         errorMessage: error
//     }
// }

// export const validateDeviceName = (value) => {
//     const valueIsEmpty = value.trim() == ''
//     // console.log(valueIsValid, errorMessage)

//     if (valueIsEmpty) {
//         return 'Device name cannot be empty'
//     } else {
//         value = true
//         return ''
//     }
// }

// export const test = (value) => {
//     validateValue(value, validateDeviceName)
// }

const validateEmail = (value) => {
    let emailIsValid = false
    let errorMessage = ''

    const usernameIsEmpty = value.trim() == ''

    if (usernameIsEmpty) {
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

const validateDeviceName = (value) => {
    let deviceNameIsValid = false
    let errorMessage = ''

    const usernameIsEmpty = value.trim() == ''

    if (usernameIsEmpty) {
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

    const usernameIsEmpty = value.trim() == ''

    if (usernameIsEmpty) {
        errorMessage = 'Monitor cannot be empty'
    } else if (value.length > 100) {
        errorMessage = 'Device name is too long'
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
        errorMessage = 'Device name is too long'
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

    const usernameIsEmpty = value.trim() == ''

    if (usernameIsEmpty) {
        errorMessage = 'PPM cannot be empty'
    } else {
        ppmIsValid = true
    }

    return {
        valueIsValid: ppmIsValid,
        errorMessage: errorMessage
    }
}

const validateTemperature= (value) => {
    let ppmIsValid = false
    let errorMessage = ''

    const usernameIsEmpty = value.trim() == ''

    if (usernameIsEmpty) {
        errorMessage = 'Temperature cannot be empty'
    } else {
        ppmIsValid = true
    }

    return {
        valueIsValid: ppmIsValid,
        errorMessage: errorMessage
    }
}



export { 
    validatePassword, 
    validateConfirmPassword, 
    validateUsername, 
    validateEmail,
    validateDeviceName,
    validateDeviceMonitor,
    validateDeviceDescription,
    validatePpm,
    validateTemperature
}

 