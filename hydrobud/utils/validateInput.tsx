import { includesUppercaseLetter, includesLowercaseLetter, includesSpecialCharacter } from "./helper"

const validatePassword = (value: string) => {
    let passwordIsValid = false
    let errorMessage = ''

    const passwordIsEmpty = value.trim() == ''

    if (passwordIsEmpty) {
        errorMessage = 'Password cannot be empty'
    } else if (value.length < 8) {
        errorMessage = "Password needs to be longer than 8 characters"
    } else if (!includesUppercaseLetter(value)){
        errorMessage = "Password needs to include a uppercase letter"
    } else if (!includesLowercaseLetter(value)) {
        errorMessage = "Password needs to include a lowercase letter"
    } else if (!includesSpecialCharacter(value)) {  
        errorMessage = "Password needs to include a special character"
    } else {
        passwordIsValid = true
    }
    
    return {
        valueIsValid: passwordIsValid,
        errorMessage: errorMessage
    }
}

const validateConfirmPassword = (valueToCheck: string, valueToCheckAgainst: string) => {
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

export { validatePassword, validateConfirmPassword }