import React from "react"

const Metric = ({label, enabled}) => {
    return (
        <div className='flex flex-row space-x-[0.6rem]'>
            <label className='text-[1.5rem] font-semibold'>{label}</label>
            <div
                className={`${
                    enabled ? 'bg-[#B6CB9E]' : 'bg-[#D7D9DE]'
                } inline-flex h-[2rem] w-[3.5rem] items-center rounded-full`}
                >
                <span
                    className={`${enabled ? 'ml-[1.65rem]':'ml-[0.45rem]'} h-[1.5rem] w-[1.5rem] rounded-full bg-[#7c9478]`}
                />
            </div>
        </div>
    )
}

export default Metric