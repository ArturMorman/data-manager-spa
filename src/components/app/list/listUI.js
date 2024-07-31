import React from 'react'
import categoriesTagsFunction from '../../../functions/categoriesTags'
import categoryHandle from '../../../functions/categoryHandle'
import ListFilters from './listFilters'
import LoadingPlaceholder from '../loadingPlaceholder'
import SvgDisplayWrapper from '../../digitProcessor/svgDisplayWrapper'

const ListUI = ({ panel, loadingTaxonomies, loadingTaxonomiesDone, categories, activeCategories, setActiveCategories, activeTaxonomy, setActiveTaxonomy, taxIdsFiltered, listState, somethingSelected, panelChanged }) => {

  const categoriesTags = categoriesTagsFunction(categories)

  return (
    <>
      {panel &&
        <div className={`panel animatedBackground headTop listView ${somethingSelected ? 'backgroundChange' : ''} ${panelChanged ? 'panelChanged' : ''}`} >
          {(listState.count || listState.count === 0) ?
            <div className={`count ${listState.postsFilteredOut === 0 ? 'infinity' : ''}`}>
              <SvgDisplayWrapper value={listState.count} />
              {listState.count === 1 ?
                <span>Project matches criteria</span> :
                listState.postsFilteredOut === 0 ?
                  <span>Projects total</span> :
                  <span>Projects matches criteria</span>
              }

              {listState.postsFilteredOut === 0 ?
                (<span className={`desc`}>Start selecting categories, to find, what you're looking for</span>)
                :
                (<span className={`clearAllwrapp`}><button
                  onClick={() => setActiveCategories([])}
                >
                  Clear All
                </button></span>)
              }

              {activeCategories && activeCategories.length > 0 &&
                <>
                  {activeCategories.map((cat, i) => {
                    const catObj = categoriesTags.catNameById(cat)
                    return (
                      <button
                        key={i}
                        className={`selectedCatName ${i === 0 ? 'firstChild' : ''}`}
                        onClick={() => categoryHandle(cat, catObj['parent'], catObj['choice'], activeCategories, setActiveCategories, activeTaxonomy, setActiveTaxonomy)}
                        onKeyDown={(e) => e.key === 'Enter' && categoryHandle(cat, catObj['parent'], catObj['choice'], activeCategories, setActiveCategories, activeTaxonomy, setActiveTaxonomy)}
                      >
                        {catObj['name']}
                        <span className={`remove`}>x</span>
                      </button>
                    )
                  })}
                </>
              }

            </div>
            :
            <div>
              Counting...
            </div>
          }

          {(loadingTaxonomies || loadingTaxonomiesDone) &&
            <LoadingPlaceholder
              view={`listView listUi ${loadingTaxonomiesDone ? 'loadingDone' : ''}`}
              text={
                loadingTaxonomies ?
                  'loading categories...'
                  :
                  'categories loaded, have fun'
              }
            />
          }

          <ListFilters
            categories={categories}
            activeTaxonomy={activeTaxonomy}
            setActiveTaxonomy={setActiveTaxonomy}
            activeCategories={activeCategories}
            setActiveCategories={setActiveCategories}
            taxIdsFiltered={taxIdsFiltered}
          />

        </div>
      }
    </>
  )
}
export default ListUI