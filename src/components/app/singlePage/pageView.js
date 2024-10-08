import React, { useState, useEffect, useMemo } from 'react'
import categoriesTagsFunction from '../../../functions/categoriesTags'
import parse from 'html-react-parser'
import PageTab from './pageTab'
import PageFieldListEl from './pageFieldListEl'
import SvgDisplayWrapper from '../digitProcessor/svgDisplay'
import ProductIcon from '../common/productIcon'
import LanguageIcon from '../common/languageIcon'
import TechnologyIcon from '../common/technologyIcon'


const PageView = ({ post, icons, iconsMap, categories, isAuthenticated, authToken, fetchPost }) => {

  const categoriesTags = categoriesTagsFunction(categories)

  const date = post.date.slice(0, post.date.indexOf('T'))
  const year = date.slice(0, post.date.indexOf('-'))
  const monthAndDay = date.slice(post.date.indexOf('-') + 1)
  const month = monthAndDay.slice(0, monthAndDay.indexOf('-'))
  const day = monthAndDay.slice(monthAndDay.indexOf('-') + 1)


  // const dateMod = post.modified.slice(0, post.modified.indexOf('T'))
  // const yearMod = dateMod.slice(0, post.modified.indexOf('-'))
  // const monthAndDayMod = dateMod.slice(post.modified.indexOf('-') + 1)
  // const monthMod = monthAndDayMod.slice(0, monthAndDayMod.indexOf('-'))
  // const dayMod = monthAndDayMod.slice(monthAndDayMod.indexOf('-') + 1)

  const [modified, setModified] = useState(null)


  const [activeTab, setActiveTab] = useState(null)
  const [tabChange, setTabChange] = useState(false)

  const getFilteredProps = (customData) => {
    const { common, ...otherProps } = customData.groups
    otherProps.description = {}
    otherProps.description.content = post.content.rendered
    otherProps.description.group_title = 'description'
    return otherProps
  }

  const filteredProps = useMemo(() => post.customData ? getFilteredProps(post.customData) : {}, [post.customData])
  const tabKeys = useMemo(() => [...Object.keys(filteredProps)].reverse(), [filteredProps])

  useEffect(() => {
    if (tabKeys.length > 0 && !activeTab) {
      setActiveTab(tabKeys[0])
    }
  }, [tabKeys])


  useEffect(() => {
    setTabChange(true)
    const timeout = setTimeout(() => {
      setTabChange(false)
    }, 999)
    return () => clearTimeout(timeout)
  }, [activeTab])


  useEffect(() => {

    // console.log('_ SET MODIFIED _')
    // console.log(post)

    post?.modified && setModified({
      year: post.modified.slice(0, post.modified.indexOf('T')).slice(0, post.modified.indexOf('-')),

      month: post.modified.slice(0, post.modified.indexOf('T')).slice(post.modified.indexOf('-') + 1).slice(0, post.modified.slice(0, post.modified.indexOf('T')).slice(post.modified.indexOf('-') + 1).indexOf('-')),

      day: post.modified.slice(0, post.modified.indexOf('T')).slice(post.modified.indexOf('-') + 1).slice(post.modified.slice(0, post.modified.indexOf('T')).slice(post.modified.indexOf('-') + 1).indexOf('-') + 1)
    })
  }, [post])


  return (
    <>
      {post &&
        <div className={`single post`}>

          <section>
            {(post.title && post.title.rendered) && <h1>
              {parse(post.title.rendered || '')}
            </h1>}
          </section>

          <section>
            <div className={`icons`}>

              {categoriesTags.clientsTags(post).length > 0 &&
                <div>
                  <h5>Client: <span>{categoriesTags.clientsTags(post)[0].name}</span></h5>
                  <img title={`Client: ${iconsMap[post.clients[0]]}`} className={`client`} alt="" src={icons[post.clients[0]]} />
                </div>
              }

              {categoriesTags.languagesTags(post).length > 0 &&
                <div>

                  <h5>Project language: <span>
                    {categoriesTags.languagesTags(post).map((el, i) => {
                      return (
                        <React.Fragment
                          key={i}
                        >
                          {categoriesTags.languagesTags(post).length - 1 === i ? el.name : `${el.name}, `}
                        </React.Fragment>
                      )
                    })}
                  </span></h5>

                  <span className={`languageIcons`}>
                    {post.languages?.map(el => {
                      return (
                        <LanguageIcon
                          key={el}
                          language={iconsMap[el]}
                        />
                      )
                    })}
                  </span>


                </div>
              }

              {categoriesTags.productTypesTags(post).length > 0 &&
                <div>
                  <h5>Project type: <span>{categoriesTags.productTypesTags(post)[0].name}</span></h5>
                  <ProductIcon product={iconsMap[post.productTypes[0]]} />
                </div>
              }

              {categoriesTags.technologiesTags(post).length > 0 &&
                <>
                  <h5>Technologies used:</h5>
                  <div className={`technologies`}>
                    {post.technologies.map(tech => {
                      return <TechnologyIcon key={tech} technology={iconsMap[tech]} />
                    })}
                  </div>
                </>
              }
            </div>
          </section>

          {Object.keys(filteredProps).length > 0 && tabKeys.length > 0 &&
            <section className={`tabs animatedBackground ${tabChange ? 'backgroundChange' : ''}`}>
              <div className="tabButtons">
                {tabKeys.map(key => (
                  <button
                    className={`tabButton ${key === activeTab ? 'active' : ''}`}
                    key={key}
                    title={`Project Data Tab: ${key}`}
                    onClick={() => setActiveTab(key)}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveTab(key)}
                  >
                    {key}
                  </button>
                ))}
              </div>
              {activeTab && <PageTab activeTab={activeTab} data={filteredProps[activeTab]} tabChange={tabChange} PageFieldListEl={PageFieldListEl} isAuthenticated={isAuthenticated} postId={post.id} authToken={authToken} fetchPost={fetchPost} />}
            </section>
          }

          <section>
            {post.customData.groups.common.fields.length > 0 && <div className={`customData customDataWrap`}>
              <h4>{post.customData.groups.common.group_title}:</h4>
              {post.customData.groups.common.fields.length > 0 && post.customData.groups.common.fields.map(field => {
                return (
                  <PageFieldListEl key={field.name} field={field} isAuthenticated={isAuthenticated} postId={post.id} authToken={authToken} fetchPost={fetchPost} />
                )
              })}
            </div>}
          </section>

          <section>
            <div className={`tags clients`}>
              {categoriesTags.clientsTags(post).map(tag => (<span key={tag.name} >{tag.name}</span>))}
              {categoriesTags.languagesTags(post).map(tag => (<span key={tag.name} >{tag.name}</span>))}
              {categoriesTags.productTypesTags(post).map(tag => (<span key={tag.name} >{tag.name}</span>))}
            </div>
            <div className={`tags technologies`}>
              {categoriesTags.technologiesTags(post).map(tag => (<span key={tag.name} >{tag.name}</span>))}
            </div>
          </section>

          <section>
            <div className={'date'}>
              <div>
                Record created: <SvgDisplayWrapper value={year} /><SvgDisplayWrapper value={month} symbNum={2} /><SvgDisplayWrapper value={day} symbNum={2} />
              </div>
            </div>
            <div className={'date'}>
              {modified && <div>
                Last modified: <SvgDisplayWrapper value={modified.year} /><SvgDisplayWrapper value={modified.month} symbNum={2} /><SvgDisplayWrapper value={modified.day} symbNum={2} />
              </div>}
            </div>
          </section>

        </div>
      }
    </>
  )
}
export default PageView