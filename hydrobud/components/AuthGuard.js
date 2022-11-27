import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { SIGN_IN_REDIRECT_KEY, setRedirect} from '../utils/redirect'

// importing custom context
import { useAuthContext } from '../context/AuthContext'

const AuthGuard = ({children}) => { 
  const { currentUser, initializing } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!initializing) {
      //auth is initialized and there is no user
      if (!currentUser) {
        // remember the page that user tried to access
        setRedirect(SIGN_IN_REDIRECT_KEY, router.route)
        router.push('/login')
      }
    }
  }, [initializing, currentUser])

  if (initializing) {
      return <h1>Application Loading</h1>
  }

  if (!initializing && currentUser) {
      return <>{children}</>
  }

  return null
}

export default AuthGuard
