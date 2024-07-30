import React from 'react'
import Logo from '../../images/dv-logo'

const UiFixed = ({ panel, setPanel, panelChanged }) => {
  return (
    <div
      className={`uiFixed ${panel ? 'listView' : 'postView'} ${panelChanged ? 'panelChanged' : ''}`}
    >
      <div
        className={`logoWrap ${panel ? 'listView' : 'postView'} ${panelChanged ? 'panelChanged' : ''}`}
      >
        <Logo />
      </div>
      <div
        className={`buttonsWrap`}
      >
        <button
          className={`cta2 listViewSwitch`}
          onClick={() => setPanel(!panel)}
          onKeyDown={(e) => e.key === 'Enter' && setPanel(!panel)}
          tabIndex='0'
        >
          {panel ? 'Single Project view' : 'Projects list view'}
        </button>
      </div>
    </div>
  )
}
export default UiFixed