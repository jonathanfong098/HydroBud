const includesUppercaseLetter = (value) => {
    return Boolean(value.match(/[A-Z]/));
  }

const includesLowercaseLetter = (value) => {
    return Boolean(value.match(/[a-z]/));
}   

const includesSpecialCharacter = (value) => {
    return Boolean(value.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/))
}

const includesWhitespace = (value) => {
    return Boolean(value.match(/\s/))
}

const validEmail = (value) => {
    return Boolean(value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
}

const objectIsEmpty = (object) => {
    return (Object.keys(object).length === 0 && object.constructor === Object)
}

export { includesUppercaseLetter, includesLowercaseLetter, includesSpecialCharacter, includesWhitespace, validEmail, objectIsEmpty }