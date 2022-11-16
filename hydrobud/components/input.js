import React from "react";

const Input = ({name, value, onChange}) => {
    return (
        <>
            <input 
                name={name} 
                type='text' 
                className='w-full h-[4rem] bg-[#D7D9DE] rounded-[1rem] text-[1.5rem] focus:outline-none focus:border-[0.1rem] focus:border-black'
                value={value}
                onChange={onChange}
            />
        </>
    )
}

export default Input

