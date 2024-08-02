import React from 'react'
import Logo from '../../../images/dv-logo'
import GlobalMenu from './globalSettings'

const UiFixed = ({ customLayouts, customLayout, setCustomLayout, panel, setPanel, panelChanged }) => {
  return (
    <header
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
        >
          {panel ? 'Single Project view' : 'Projects list view'}
        </button>

        <GlobalMenu
          customLayouts={customLayouts}
          customLayout={customLayout}
          setCustomLayout={setCustomLayout}
        />

      </div>

    </header>
  )
}
export default UiFixed