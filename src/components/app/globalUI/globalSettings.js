import React, { useState } from 'react'
import { GrUserSettings } from "react-icons/gr"
import { IoIosArrowDropdownCircle } from 'react-icons/io'

const GlobalSettings = ({ customLayouts, customLayout, setCustomLayout }) => {

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

        {customLayouts?.length > 0 && customLayouts.map(layout => {
          return (
            <button
              key={layout}
              className={`layoutSwitch ${customLayout === layout ? 'active' : ''}`}
              onClick={() => setCustomLayout(customLayout !== layout ? layout : null)}
              onKeyDown={(e) => e.key === 'Enter' && setCustomLayout(customLayout !== layout ? layout : null)}
            >
              {layout} mode
            </button>
          )
        })}

        <button
          className={`cta2`}
        >
          login/logout
        </button>

      </div>
    </>
  )
}
export default GlobalSettings