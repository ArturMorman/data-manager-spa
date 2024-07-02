import React from 'react'
import parse from 'html-react-parser'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ListFilters = ({ categories, activeCategories, setActiveCategories, activeTaxonomy, setActiveTaxonomy, taxIdsFiltred }) => {

  //// HANDLE CATEGORY LIST ITEM CLICK
  const categoryHandle = (id, parent, choice) => {
    if (!activeCategories.includes(id)) {
      if (choice === 'singleChoice') {
        if (!activeTaxonomy.includes(parent)) {
          setActiveCategories(prev => [...prev, id])
          setActiveTaxonomy(prev => [...prev, parent])
        }
        else {
          console.log(`_system: ${parent} already set!`)
        }
      }
      else {
        setActiveCategories(prev => [...prev, id])
      }
    }
    else if (activeCategories.includes(id)) {
      setActiveCategories(prev => [...prev.filter(el => el !== id)])
      if (choice === 'singleChoice') {
        if (activeTaxonomy.includes(parent)) {
          setActiveTaxonomy(prev => [...prev.filter(el => el !== parent)])
        }
      }
    }
    else {
      console.log('SECRET ERROR')
    }
  }

  return (
    <div className={`filtersWrapper`}>
      {
        categories && categories.length > 0 && categories.map((tax, i) => {
          return (

            <div
              key={i}
              className={`filters ${tax.options.choice === 'singleChoice' ? 'singleChoice' : 'multiChoice'}`}
              style={{ order: `${tax.options.order}` }}
            >

              <span className={`choiceType`}>
                {tax.options.choice === 'singleChoice' && 'Choose one'}
                {tax.options.choice === 'multiChoice' && 'Choose one or more'}
              </span>

              <br></br>

              <strong className={`taxonomyName`}>
                {tax.name && tax.name}:
              </strong>

              <ul className={`categoriesList tax-${tax.name} ${activeTaxonomy.includes(tax.name) ? 'active' : ''} ${activeTaxonomy.includes(tax.name) && tax.options.choice === 'singleChoice' ? 'sealed' : ''}`}>

                {(tax.response && tax.response.length > 0) && tax.response.map((cat, i2) => {
                  const parent = tax.name
                  const choice = tax.options.choice
                  const pass = taxIdsFiltred.includes(cat.id)
                  return (
                    <li
                      key={i2}
                      className={`category tax-${tax.name} cat-${cat.name} ${activeCategories.includes(cat.id) ? 'active' : ''} ${!pass ? 'inactive' : ''}`}
                      onClick={pass ? () => categoryHandle(cat.id, parent, choice) : () => { }}
                      onKeyDown={pass ? (e) => e.key === 'Enter' && categoryHandle(cat.id, parent, choice) : () => { }}
                      tabIndex='0'
                    >
                      {cat.name && parse(cat.name)}
                      {activeCategories.includes(cat.id) && <FaCheckCircle size="1.1em" />}
                      {!pass && <FaTimesCircle className="xtimes" size="1.1em" />}
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