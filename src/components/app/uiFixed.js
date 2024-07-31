import React from 'react'
import Logo from '../../images/dv-logo'

const UiFixed = ({ panel, setPanel, panelChanged }) => {
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

        <button
          className={`cta2`}
        >
          DARK MODE
        </button>

        <button
          className={`cta2`}
        >
          SICK MODE
        </button>

        <button
          className={`cta2`}
        >
          login/logout
        </button>

      </div>

    </header>
  )
}
export default UiFixed