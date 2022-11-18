import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Homepage from './home/index'
import Signup from './signup/index'
import Login from './login'

export default function Home() {
  return (
      <Homepage/>
  )
}
