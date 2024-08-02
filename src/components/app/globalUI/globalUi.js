import React from 'react'
import Logo from '../../../images/dv-logo'
import GlobalMenu from './globalSettings'
import { VscDiffSingle } from "react-icons/vsc"
import { CiViewList } from "react-icons/ci"

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
          <span className={`symbol ${panel ? 'active' : ''}`}><CiViewList size="2.55em" /></span>
          <span className={`switchIcon ${panel ? 'list' : 'post'}`}><span className={`ball`}></span></span>
          <span className={`symbol ${!panel ? 'active' : ''}`}><VscDiffSingle size="2.25em" /></span>
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