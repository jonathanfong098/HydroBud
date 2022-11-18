import React, {useReducer, useState, useEffect} from 'react'

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
    
    // const [valueInputTouched, setValueInputTouched] = useState(false)
    // const touchValueInput = () => {
    //   if (!valueInputTouched){
    //     setValueInputTouched(true)
    //   }
    // }

    // const [valueInputIsInvalid, setValueInputIsInvalid] = useState(true)
    // useEffect(() => {
    //   const result = !emailIsValid && emailInputTouched
    //   setValueInputIsInvalid(result)
    // }, [inputState.valueIsValid, valueInputTouched])

    return {
      inputState: inputState,
      dispatchInput: dispatchInput,
      // valueInputTouched: valueInputTouched
      // touchValueInput: touchValueInput
    }
}

export default useInput