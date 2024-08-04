import React from 'react'
import Logo from '../../../images/dv-logo'
import GlobalMenu from './globalSettings'
// import { GrNotes } from "react-icons/gr"
import { GrDocumentText } from "react-icons/gr"
import { GrTable } from "react-icons/gr"

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
          title='Switch between Projects List View and Single Project View'
          onClick={() => setPanel(!panel)}
          onKeyDown={(e) => e.key === 'Enter' && setPanel(!panel)}
        >
          <span className={`symbol ${panel ? 'active' : ''}`}>
            <GrTable size="1.66em" />
          </span>
          <span className={`switchIcon ${panel ? 'list' : 'post'}`}><span className={`ball`}></span></span>
          <span className={`symbol ${!panel ? 'active' : ''}`}>
            {/* <GrNotes size="2.2em" /> */}
            <GrDocumentText size="1.66em" />
          </span>
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