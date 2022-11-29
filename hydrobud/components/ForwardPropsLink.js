import { forwardRef } from 'react'
import Link from 'next/link'

const ForwardPropsLink = forwardRef((props, ref) => {
  let { href, children, ...rest } = props
  return (
    <Link 
        href={href} 
        legacyBehavior={true} 
    >
        <a 
            ref={ref} {...rest}
            className='w-full h-full'
        >
            {children}
        </a>
    </Link>
  )
})

ForwardPropsLink.displayName = 'ForwardPropsLink'

export default ForwardPropsLink
