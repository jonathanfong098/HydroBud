import { includesUppercaseLetter, includesLowercaseLetter, includesSpecialCharacter, includesWhitespace, validEmail } from "./helper"

const validateEmail = (value) => {
    let emailIsValid = false
    let errorMessage = ''

    const usernameIsEmpty = value.trim() == ''

    if (usernameIsEmpty) {
        errorMessage = 'Email cannot be empty'
    } else if (!validEmail(value)) {
        errorMessage = "Email is not valid"
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
        errorMessage = "Username should not include whitespace"
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

export { validatePassword, validateConfirmPassword, validateUsername, validateEmail}

 