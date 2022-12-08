import React, {useReducer, useState, useEffect} from 'react'

const useInput = (validateValue, initialValue = '') => {
    const inputReducer = (state, action) => {
      const { type, value } = action

        if (type === 'INITIALIZE' || type === 'USER_INPUT') {
            const {valueIsValid, errorMessage} = validateValue(value)

            return {
              value: value, 
              valueIsValid: valueIsValid, 
              errorMessage: errorMessage,
            }
        } else if (type === 'RESET') {
          console.log('resetting')
          return {
            value: value, 
            valueIsValid: true, 
            errorMessage: '',
          } 
        }
    
        return {
          value: '', 
          valueIsValid: false, 
          errorMessage: '',
        }
    }
    
    const [inputState, dispatchInput] = useReducer(inputReducer, {
        value: initialValue,
        valueIsValid: false,
        errorMessage: '',
    })
    
    const [valueInputTouched, setValueInputTouched] = useState(false)
    const touchValueInput = () => {
      if (!valueInputTouched){
        setValueInputTouched(true)
      }
    }
    const untouchValueInput = () => {
      if (valueInputTouched){
        setValueInputTouched(false)
      }
    }

    const [valueInputIsInvalid, setValueInputIsInvalid] = useState(false)
    useEffect(() => {
      const result = !inputState.valueIsValid && valueInputTouched
      setValueInputIsInvalid(result)
    }, [inputState.valueIsValid, valueInputTouched])

    const resetValue = (resetValue = '') => {
      dispatchInput({type: 'RESET', value: resetValue})
      untouchValueInput()
    }

    return {
      inputState: inputState,
      dispatchInput: dispatchInput,
      valueInputTouched: valueInputTouched,
      touchValueInput: touchValueInput,
      untouchValueInput: untouchValueInput,
      valueInputIsInvalid: valueInputIsInvalid,
      resetValue: resetValue
    }
}

export default useInput