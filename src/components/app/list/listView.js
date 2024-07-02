import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import Pagination from './pagination'
import ProductIcon from '../common/productIcon'
import LanguageIcon from '../common/languageIcon'
import TechnologyIcon from '../common/technologyIcon'

import Img37 from '../../../images/taxoomyImages/37.png'
import Img51 from '../../../images/taxoomyImages/51.png'
import Img60 from '../../../images/taxoomyImages/60.png'
import Img61 from '../../../images/taxoomyImages/61.png'
import Img62 from '../../../images/taxoomyImages/62.png'
import Img69 from '../../../images/taxoomyImages/69.png'
import Img64 from '../../../images/taxoomyImages/64.png'
import Img66 from '../../../images/taxoomyImages/66.png'
import Img72 from '../../../images/taxoomyImages/72.png'
import Img77 from '../../../images/taxoomyImages/77.png'
import Img78 from '../../../images/taxoomyImages/78.png'
import Img123 from '../../../images/taxoomyImages/123.png'


const ListView = ({ children, posts, loading, panel, setPanel, categories, page, perPage, setPage, setPerPage, allPages, perPageOptions }) => {

  const [selectedObj, setSelectedObj] = useState((posts && posts.length > 0) ? posts[0] : null)

  const [iconsMap, setIconsMaps] = useState(null)

  const icons = {
    37: Img37,
    51: Img51,
    60: Img60,
    61: Img61,
    62: Img62,
    64: Img64,
    66: Img66,
    69: Img69,
    72: Img72,
    77: Img77,
    78: Img78,
    123: Img123,
  }

  useEffect(() => {
    const taxonomies = Object.keys(categories)
    let iconsMap = {}
    taxonomies.length > 0 && taxonomies.forEach(obj => {
      categories[obj].response.forEach(cat => {
        iconsMap[cat.id] = cat.name
      })
    })
    setIconsMaps(iconsMap)
  }, [categories])


  useEffect(() => {
    if (page > allPages) {
      setPage(allPages)
    }
  }, [page, allPages])


  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, {
      post: selectedObj,
      icons: icons,
      iconsMap: iconsMap,
      categories: categories
    }),
  )


  return (
    <>
      {panel && <div className={`listView fixedPanel fixedList ${panel ? 'panelOpen' : ''}`}>

        {(loading && posts) && <div className={`pageListLoading`} ><div className={`loadingIndicator`}></div></div>}

        <Pagination page={page} perPage={perPage} setPage={setPage} setPerPage={setPerPage} allPages={allPages} perPageOptions={perPageOptions} />

        {(posts && posts.length > 0) &&
          <ul className={`list`} >
            {posts.map((post, i) => {
              return (
                <React.Fragment key={i} >
                  {post.parent !== 0 && <li
                    className={`listItem`}
                  >
                    <button
                      onClick={
                        () => {
                          setSelectedObj(posts[i])
                          setPanel(false)
                        }
                      }
                      onKeyDown={
                        (e) => {
                          if (e.key === 'Enter') {
                            setSelectedObj(posts[i])
                            setPanel(false)
                          }
                        }
                      }
                      tabIndex='0'
                    >

                      <img className={`client`} alt="" src={icons[post.clients[0]]} />
                      <div>
                        <LanguageIcon language={iconsMap[post.languages[0]]} />
                        <ProductIcon product={iconsMap[post.productTypes[0]]} />
                      </div>
                      <div className={`technologies`}>

                        {post.technologies.length > 0 && post.technologies.map(tech => {
                          return (
                            <TechnologyIcon key={tech} technology={iconsMap[tech]} />
                          )
                        })}

                      </div>

                      <h4>
                        {parse(post.title.rendered || '')}
                      </h4>
                    </button>
                  </li>}
                </React.Fragment>
              )
            })}
          </ul>
        }

        <Pagination bottom={true} page={page} perPage={perPage} setPage={setPage} setPerPage={setPerPage} allPages={allPages} perPageOptions={perPageOptions} />

      </div>}

      {childrenWithProps}
    </>
  )
}
export default ListView