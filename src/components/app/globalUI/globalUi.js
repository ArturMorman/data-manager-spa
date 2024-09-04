import React from 'react'
import Logo from '../../../images/dv-logo'
import GlobalSettings from './globalSettings'
import { GrDocumentText } from 'react-icons/gr'
import { GrApps } from 'react-icons/gr'
import LastVisited from './lastVisited'


const GlobalUi = ({ customLayouts, customLayout, setCustomLayout, panel, setPanel, panelChanged, onLogout, onLogin, wpSiteUrl, isAuthenticated, username, lastVisited, handleLastVisited, selectedObj, setSelectedObj }) => {
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
            <GrApps size="1.66em" />
          </span>
          <span className={`switchIcon ${panel ? 'list' : 'post'}`}><span className={`ball`}></span></span>
          <span className={`symbol ${!panel ? 'active' : ''}`}>
            <GrDocumentText size="1.66em" />
          </span>
        </button>

        <GlobalSettings
          customLayouts={customLayouts}
          customLayout={customLayout}
          setCustomLayout={setCustomLayout}
          onLogout={onLogout}
          onLogin={onLogin}
          wpSiteUrl={wpSiteUrl}
          isAuthenticated={isAuthenticated}
          username={username}
        />

        {lastVisited?.length > 0 && <LastVisited
          lastVisited={lastVisited}
          handleLastVisited={handleLastVisited}
          setPanel={setPanel}
          selectedObj={selectedObj}
          setSelectedObj={setSelectedObj}
        />}

      </div>

    </header>
  )
}
export default GlobalUi