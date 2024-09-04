import React, { useState } from 'react'
import { IoIosArrowDropdownCircle } from 'react-icons/io'

const LastVisited = ({ lastVisited, handleLastVisited, setPanel, selectedObj, setSelectedObj }) => {

  const [dropDownOpen, setDropDownOpen] = useState(false)

  return (
    <div className={`lastVisited ${dropDownOpen ? 'open' : ''}`}>
      <button
        className={`lastVisitedDropdown`}
        title="Dropdown menu with last visited projects"
        onClick={() => setDropDownOpen(!dropDownOpen)}
        onKeyDown={(e) => e.key === 'Enter' && setDropDownOpen(!dropDownOpen)}
      >
        <span>Last Visited</span>
        <IoIosArrowDropdownCircle size="1.3em" className={`arrow`} />
      </button>
      <ul className={`lastVisitedList`}>
        {lastVisited?.length > 0 && lastVisited.map((el, i) => {
          return (
            <li
              key={el.id}
              className={`lastVisitedElement`}
            >
              <button
                onClick={() => {
                  setPanel(false)
                  setSelectedObj({ id: el.id })
                  handleLastVisited(el.id, el.name)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setPanel(false)
                    setSelectedObj({ id: el.id })
                    handleLastVisited(el.id, el.name)
                  }
                }}
              >
                <span className={`title`}>
                  {el.name.rendered}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      {dropDownOpen && <div className={`closeGlobalMenu`} onClick={() => setDropDownOpen(false)} ></div>}
    </div>
  )
}
export default LastVisited