import React from 'react'

const Input = ({children, isTextArea, textAreaHeight, inputType, id, name, label, value, onChangeHandler, valueInputIsInvalid, valueError}) => {
    return (
        <div className='flex flex-col'>
            <label 
                htmlFor={name} 
                className='text-[2rem] font-semibold'
            >
                {label}:
            </label>
            <div className={`flex flex-row w-full ${isTextArea ? `h-[${textAreaHeight}rem]` : 'h-[4rem]'} bg-[#FFFFFF] rounded-[1rem] border-[0.13rem] ${valueInputIsInvalid ? 'border-[#EE392F]' : 'border-[#FAFAFA]'} focus:outline-none ${valueInputIsInvalid ? '' : 'focus-within:border-[#7A7A7A]'} shadow-md`}>
                {isTextArea ? 
                    (
                        <textarea 
                            id={id}
                            className='w-full h-full p-[1rem] text-[1.5rem] font-montserrat_regular resize-none h-full bg-[#EBEBEB] bg-opacity-0 focus:outline-none scrollbar' 
                            value={value} 
                            onChange={onChangeHandler}
                            onBlur={onChangeHandler}
                        />
                        
                    )
                    :
                    (
                        <input
                            name={name}
                            type={inputType}
                            className='w-full h-full mx-[1rem] bg-transparent text-[1.5rem] focus:outline-none'
                            value={value}
                            onChange={onChangeHandler}
                            onBlur={onChangeHandler}
                        />
                    ) 
                }
                {children}
            </div>
            {valueInputIsInvalid && (<div className='text-[0.8rem] text-[#EE392F] ml-[1rem]'>{valueError}</div>)}
        </div>
    )
}

export default Input