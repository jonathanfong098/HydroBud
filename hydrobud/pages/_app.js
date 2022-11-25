import '../styles/globals.css'

import AuthProvider from '../context/AuthContext'
import AuthGuard from '../components/AuthGuard'
import DevicesProvider from '../context/DeviceContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* <DevicesProvider>
        <Component {...pageProps} />
      </DevicesProvider> */}
      {/* if requireAuth property is present - protect the page */}
      {Component.requireAuth ? (
        <AuthGuard>
          <DevicesProvider>
            <Component {...pageProps} />
          </DevicesProvider>
        </AuthGuard>
      ) : (
        // public page
        <Component {...pageProps} />
      )}
    </AuthProvider>
  )

}

export default MyApp
