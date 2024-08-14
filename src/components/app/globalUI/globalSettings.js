import React, { useState } from 'react'
import { GrUserSettings } from 'react-icons/gr'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import Login from '../auth/login'
import Doll from '../../../images/dv-doll'
import { GrLogout } from 'react-icons/gr'

const GlobalSettings = ({ customLayouts, customLayout, setCustomLayout, onLogout, onLogin, wpSiteUrl, isAuthenticated, username }) => {

  const [showSettings, setShowSettings] = useState(false)

  return (
    <>
      <button
        title='Global Settings Menu'
        className={`globalMenuSwitch ${showSettings ? 'open' : 'closed'}`}
        onClick={() => setShowSettings(!showSettings)}
        onKeyDown={(e) => e.key === 'Enter' && setShowSettings(!showSettings)}
      >
        <GrUserSettings size="1em" />
        <IoIosArrowDropdownCircle size="1.08em" className={`arrow`} />
      </button>

      <div
        className={`globalMenu ${showSettings ? 'open' : 'closed'}`}
      >

        <div>
          {/* <strong>Layouts:</strong> */}
          {customLayouts?.length > 0 && customLayouts.map(layout => {
            return (
              <button
                key={layout}
                className={`layoutSwitch ${customLayout === layout ? 'active' : ''}`}
                onClick={() => setCustomLayout(customLayout !== layout ? layout : null)}
                onKeyDown={(e) => e.key === 'Enter' && setCustomLayout(customLayout !== layout ? layout : null)}
              >
                {layout} mode {customLayout === layout ? 'off' : 'on'}
              </button>
            )
          })}
        </div>

        <div className={`loginWrapper`}>
          {isAuthenticated ?
            <>
              <Doll />
              <span>user: <strong>{username || ''}</strong></span>
              <button className={`flexButton`} onClick={onLogout}>Logout <GrLogout /></button>
            </>
            :
            <Login onLogin={onLogin} wpSiteUrl={wpSiteUrl} />
          }
        </div>

      </div>

      {showSettings && <div className={`closeGlobalMenu`} onClick={() => setShowSettings(false)} ></div>}
    </>
  )
}
export default GlobalSettings