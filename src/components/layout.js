import React from 'react'
import './layout.css'
import './../styles/styles.scss'

const Layout = ({ children }) => {
  return (
    <main>{children}</main>
  )
}
export default Layout