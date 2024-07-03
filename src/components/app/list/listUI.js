import React from 'react'
import ListFilters from './listFilters'
import LoadingPlaceholder from '../../loadingPlaceholder'
import SvgDisplay from '../../digitProcessor/svgDisplay'

const ListUI = ({ panel, setPanel, loadingTaxonomies, categories, activeCategories, setActiveCategories, activeTaxonomy, setActiveTaxonomy, taxIdsFiltered, listState, somethingSelected, panelChanged }) => {

  return (
    <>
      {!panel ?
        <div
          className={`panel headTop ${panel ? 'listView' : 'postView'} ${panelChanged ? 'panelChanged' : ''}`}
        >
          <button
            className={`cta2 listViewSwitch`}
            onClick={() => setPanel(true)}
            onKeyDown={(e) => e.key === 'Enter' && setPanel(true)}
            tabIndex='0'
          >
            Open list view
          </button>
        </div>
        :
        <div className={`panel animatedBackground headTop ${somethingSelected ? 'backgroundChange' : ''} ${panel ? 'listView' : 'postView'} ${panelChanged ? 'panelChanged' : ''}`} >

          <button
            className={`cta2 listViewSwitch`}
            onClick={() => setPanel(false)}
            onKeyDown={(e) => e.key === 'Enter' && setPanel(false)}
            tabIndex='0'
          >
            Close list view
          </button>

          {(listState.count || listState.count === 0) ?
            <div className={`count ${listState.postsFilteredOut === 0 ? 'infinity' : ''}`}>
              <SvgDisplay value={listState.count} />
              {listState.count === 1 ?
                <span>Project matches criteria</span> :
                listState.postsFilteredOut === 0 ?
                  <span>Projects total</span> :
                  <span>Projects matches criteria</span>
              }

              {listState.postsFilteredOut === 0 ?
                (<span className={`desc`}>Start selecting categories, to find, what you're looking for</span>)
                :
                (<span><button
                  onClick={() => setActiveCategories([])}
                >
                  Clear All
                </button></span>)
              }

            </div>
            :
            <div>
              Counting...
            </div>
          }


          {/*     ACTIVE CATEGORIES NAME/TAG LIST     */}

          {/* {activeCategories && activeCategories.length > 0 &&
            <>
              {activeCategories.map((cat, i) => {
                return (
                  <span key={i}>
                    {i !== 0 && ', '}
                    {cat}
                  </span>
                )
              })}
            </>
          } */}


          <ListFilters
            categories={categories}
            activeTaxonomy={activeTaxonomy}
            setActiveTaxonomy={setActiveTaxonomy}
            activeCategories={activeCategories}
            setActiveCategories={setActiveCategories}
            taxIdsFiltered={taxIdsFiltered}
          />

          {loadingTaxonomies && <LoadingPlaceholder view={'listView listUi'} text={'Loading categories...'} />}

        </div>
      }
    </>
  )
}
export default ListUI