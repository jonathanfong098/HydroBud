import '../styles/globals.css'

import AuthProvider from '../context/AuthContext'
import DevicesProvider from '../context/DeviceContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <DevicesProvider>
        <Component {...pageProps} />
      </DevicesProvider>
    </AuthProvider>
  )

}

export default MyApp
