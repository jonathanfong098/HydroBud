import React, {useState} from 'react'

const useAlert = () => {
    const [alertIsOpen, setAlertIsOpen] = useState(false) 
    const [alertMessage, setAlertMessage] = useState('')
    const openAlert = () => {
        setAlertIsOpen(true)
    }
    const closeAlert = () => {
        setAlertIsOpen(false)
    }

    return {
        alertIsOpen: alertIsOpen,
        openAlert: openAlert,
        closeAlert: closeAlert,
        alertMessage: alertMessage,
        setAlertMessage: setAlertMessage
    }
}

export default useAlert