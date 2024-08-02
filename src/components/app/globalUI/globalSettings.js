import React, { useState } from 'react'
import { GrUserSettings } from "react-icons/gr"

const GlobalSettings = ({ customLayouts, customLayout, setCustomLayout }) => {

  const [showSettings, setShowSettings] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowSettings(!showSettings)}
      >
        <GrUserSettings size="1.2em" />
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