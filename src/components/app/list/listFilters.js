import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import categoryHandle from '../../../functions/categoryHandle';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

const ListFilters = ({ categories, activeCategories, setActiveCategories, activeTaxonomy, setActiveTaxonomy, taxIdsFiltered }) => {

  const [sectionStatus, setSectionStatus] = useState({})

  useEffect(() => {
    if (categories && Array.isArray(categories)) {
      const temp = categories.reduce((acc, { name }) => {
        acc[name] = false
        return acc
      }, {})
      setSectionStatus(temp)
    }
  }, [categories])

  const showHideHandle = (name) => {
    if (name?.length > 0) {
      setSectionStatus((prevCategories) => ({
        ...prevCategories,
        [name]: !prevCategories[name]
      }))
    }
  }

  return (
    <div className={`filtersWrapper`}>
      {
        categories && categories.length > 0 && categories.map((tax, i) => {
          return (
            <div
              key={i}
              className={`filters ${tax.options.choice === 'singleChoice' ? 'singleChoice' : 'multiChoice'} ${sectionStatus[tax.name] ? 'show' : 'hide'}`}
              style={{ order: `${tax.options.order}` }}
            >

              <div className={`choiceType defaultHide`}>
                {tax.options.choice === 'singleChoice' && 'Choose one'}
                {tax.options.choice === 'multiChoice' && 'Choose one or more'}
              </div>

              <strong className={`taxonomyName defaultShow`}>
                {tax.name && tax.name}:
              </strong>

              <div className={`mobileShowHide defaultShow `}>
                <button
                  className={`showHideButton`}
                  onClick={() => showHideHandle(tax.name)}
                >
                  <IoIosArrowDropdownCircle size="1.55em" />
                </button>
              </div>

              <ul className={`categoriesList defaultHide tax-${tax.name} ${activeTaxonomy.includes(tax.name) ? 'active' : ''} ${activeTaxonomy.includes(tax.name) && tax.options.choice === 'singleChoice' ? 'sealed' : ''}`}>

                {(tax.response && tax.response.length > 0) && tax.response.map((cat, i2) => {
                  const parent = tax.name
                  const choice = tax.options.choice
                  const pass = taxIdsFiltered.includes(cat.id)
                  return (
                    <li
                      key={i2}
                      className={`category tax-${tax.name} cat-${cat.name} ${activeCategories.includes(cat.id) ? 'active' : ''} ${!pass ? 'inactive' : ''} ${(!pass && tax.options.choice === 'multiChoice') ? 'inactiveMulti' : ''}`}
                      onClick={pass ? () => categoryHandle(cat.id, parent, choice, activeCategories, setActiveCategories, activeTaxonomy, setActiveTaxonomy) : () => { }}
                      onKeyDown={pass ? (e) => e.key === 'Enter' && categoryHandle(cat.id, parent, choice, activeCategories, setActiveCategories, activeTaxonomy, setActiveTaxonomy) : () => { }}
                      tabIndex='0'
                    >
                      {cat.name && parse(cat.name)}
                      {/* {cat.count || ''} */}
                      {activeCategories.includes(cat.id) && <FaCheckCircle size="1.2em" />}
                      {!pass && <FaTimesCircle className="xtimes" size="1.15em" />}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })
      }
    </div>
  )
}
export default ListFilters