import React, {useState, useEffect} from 'react'
import { serverTimestamp } from 'firebase/firestore'

import { creteUserListener } from '../../services/firebase/firebase-auth'
import { updateSharedDevices } from '../../services/firebase/devices'
import { createNotification } from '../../services/firebase/firebase-auth'

const UserSharedWith = (userID) => {
    const [user, setUser] = useState()
    console.log('user', userID)
    // console.log('device', device)
    
    useEffect(() => {
        const unsubscribeUser = creteUserListener(userID.userID, setUser)
    }, [])

    const removeHandler = async () => {
        try {
            let newSharedDevice = [...userID.device.sharedWith]
            const index = newSharedDevice.indexOf(userID.userID)
            if (index > -1) {
                newSharedDevice.splice(index, 1);
              }
            if (userID.device.sharedWith.includes(userID.userID)){
                await updateSharedDevices(userID.device.id, newSharedDevice)
                await createNotification(userID.userID, {
                    message: `${userID.username} unshared their device, ${userID.device.name}, with you`,
                    description: '',
                    timestamp: serverTimestamp()
                })
            }
        } catch (error) {
            throw error
        }
    }

    return (
        <div className='flex flex-row items-center space-x-[1.5rem] w-full h-fit bg-white p-[1rem] rounded-[1rem]'>
            <img src={user?.imageURI} className='w-[4rem] h-[4rem] rounded-full'></img>
            <div className='flex flex-col w-full'>
                <div className='text-black font-semibold'>{user?.email}</div>
                <div className='text-black'>{user?.username}</div>
            </div>
            <button 
                className={`w-fit bg-[#B6CB9E] rounded-[1rem] p-[0.5rem] text-white font-semibold hover:bg-[#9CBA96]`}
                onClick={removeHandler}
            >
                Remove
            </button>
        </div>
    )
}

export default UserSharedWith