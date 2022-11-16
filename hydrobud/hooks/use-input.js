import React, {useReducer} from 'react'

const useInput = (validateValue) => {
    const inputReducer = (state, action) => {
      const { type, value } = action
      // console.log(value)

        if (type === 'INITIALIZE' || type === 'USER_INPUT') {
            const {valueIsValid, errorMessage} = validateValue(value)

            return {
              value: value, 
              valueIsValid: valueIsValid, 
              errorMessage: errorMessage,
            }
        }
    
        return {
          value: '', 
          valueIsValid: false, 
          errorMessage: '',
        }
    }
    
    const [inputState, dispatchInput] = useReducer(inputReducer, {
        value: '',
        valueIsValid: false,
        errorMessage: '',
      })

    return {
      inputState: inputState,
      dispatchInput: dispatchInput,
    }
}

export default useInput