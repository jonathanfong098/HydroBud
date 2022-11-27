import { Switch } from '@headlessui/react'

const Toggle = ({label, enabled, setEnabled}) => {
    return (
        <Switch.Group>
            <div className='flex flex-row items-center space-x-[0.8rem]'>
                <Switch.Label className='text-[2rem] font-semibold'>{label}</Switch.Label>
                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${
                        enabled ? 'bg-[#B6CB9E]' : 'bg-[#FFFFFF]'
                    } relative inline-flex h-[3rem] w-[5.3rem] items-center rounded-full`}
                    >
                    <span className="sr-only">Enable {label}</span>
                    <span
                        className={`${
                        enabled ? 'translate-x-[2.9rem]' : 'translate-x-[0.3rem]'
                        } inline-block h-[2rem] w-[2rem] transform rounded-full bg-[#7c9478] transition`}
                    />
                </Switch>
            </div>
        </Switch.Group>
    )
}

export default Toggle