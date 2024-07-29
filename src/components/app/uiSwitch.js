import React from 'react'

const UiSwitch = ({ panel, setPanel, panelChanged }) => {
  return (
    <div
      className={`panel uiSwitch ${panel ? 'listView' : 'postView'} ${panelChanged ? 'panelChanged' : ''}`}
    >
      <button
        className={`cta2 listViewSwitch`}
        onClick={() => setPanel(!panel)}
        onKeyDown={(e) => e.key === 'Enter' && setPanel(!panel)}
        tabIndex='0'
      >
        {panel ? 'Projects list view' : 'Single Project view'}
      </button>
    </div>
  )
}
export default UiSwitch