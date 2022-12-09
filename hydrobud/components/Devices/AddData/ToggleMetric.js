import { Switch } from '@headlessui/react'

const ToggleMetric = ({label, enabled, setEnabled}) => {
    return (
        <Switch.Group>
            <div className='flex flex-row items-center'>
                <Switch.Label className='text-[1.5rem] font-semibold mr-[0.5rem]'>{label.toUpperCase()}</Switch.Label>
                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${
                        enabled ? 'bg-[#B6CB9E]' : 'bg-[#FFFFFF]'
                    } inline-flex h-[2rem] w-[3.5rem] items-center rounded-full shadow-md`}
                    >
                    <span
                        className={`${
                        enabled ? 'translate-x-[1.6rem]' : 'translate-x-[0.4rem]'
                        } inline-block h-[1.5rem] w-[1.5rem] transform rounded-full bg-[#7c9478] transition`}
                    />
                </Switch>
            </div>
        </Switch.Group>
    )
}

export default ToggleMetric