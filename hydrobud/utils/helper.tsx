const includesUppercaseLetter = (value: string) => {
    return Boolean(value.match(/[A-Z]/));
  }

const includesLowercaseLetter = (value: string) => {
    return Boolean(value.match(/[a-z]/));
}   

const includesSpecialCharacter = (value: string) => {
    return(Boolean(value.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)))
}

export { includesUppercaseLetter, includesLowercaseLetter, includesSpecialCharacter }