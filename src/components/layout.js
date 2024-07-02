import React from 'react'
import './layout.css'
import './../styles/styles.scss'
// import { usePersistState } from '../hooks/usePersistState'

const Layout = ({ children }) => {

  // const [appState, setAppState] = usePersistState('showPanel', true)

  // console.log(setAppState)

  // const childrenWithProps = React.Children.map(children, child =>
  //   React.cloneElement(child, {
  //     appState: appState,
  //     setAppState: setAppState
  //   }),
  // )


  return (
    // <main>{childrenWithProps}</main>
    <main>{children}</main>
  )
}

export default Layout