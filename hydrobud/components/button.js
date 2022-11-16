import React from 'react'

const Button = ({label, width, height, bgColor}) => {
    console.log(label, width, height)

    return (
        // <button className={`bg-[#D7D9DE] font-semibold w-14 text-white text-3xl h-[5.625rem] w-[${props.width}rem]`}>
        <button 
            className={`bg-[#${bgColor}] 
                font-semibold 
                text-white 
                text-3xl 
                h-[${height}rem]
                w-[${width}rem]
                rounded-[2rem] 
                hover:bg-[#BAC0D0]`}
        >
            {label}
        </button>
    )

}

export default Button