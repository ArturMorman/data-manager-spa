import React, { useState, useEffect, useMemo } from 'react'
import parse from 'html-react-parser'
import PageTab from './pageTab'
import PageFieldList from './pageFieldListEl'
import SvgDisplay from '../../digitProcessor/svgDisplay'
import ProductIcon from '../common/productIcon'
import LanguageIcon from '../common/languageIcon'
import TechnologyIcon from '../common/technologyIcon'


const PageView = ({ post, icons, iconsMap, categories }) => {

  let clientsTags = []
  let technologiesTags = []
  let productTypesTags = []
  let languagesTags = []

  categories.forEach(cat => {
    let temp = []
    temp = cat.response.filter(obj => post.clients.includes(obj.id))
    clientsTags = [...clientsTags, ...temp]
    temp = []
    temp = cat.response.filter(obj => post.technologies.includes(obj.id))
    technologiesTags = [...technologiesTags, ...temp]
    temp = []
    temp = cat.response.filter(obj => post.productTypes.includes(obj.id))
    productTypesTags = [...productTypesTags, ...temp]
    temp = []
    temp = cat.response.filter(obj => post.languages.includes(obj.id))
    languagesTags = [...languagesTags, ...temp]
  })

  const date = post.date.slice(0, post.date.indexOf('T'))
  const year = date.slice(0, post.date.indexOf('-'))
  const monthAndDay = date.slice(post.date.indexOf('-') + 1)
  const month = monthAndDay.slice(0, monthAndDay.indexOf('-'))
  const day = monthAndDay.slice(monthAndDay.indexOf('-') + 1)

  const [activeTab, setActiveTab] = useState(null)
  const [tabChange, setTabChange] = useState(false)

  const getFilteredProps = (customData) => {
    const { common, ...otherProps } = customData.groups
    otherProps.other = {}
    otherProps.other.content = post.content.rendered  ////    ??????????
    otherProps.other.group_title = 'other'            ////    ??????????
    return otherProps
  }

  // const filteredProps = post.customData ? getFilteredProps(post.customData) : {}
  const filteredProps = useMemo(() => post.customData ? getFilteredProps(post.customData) : {}, [post.customData])
  const tabKeys = useMemo(() => [...Object.keys(filteredProps)], [filteredProps])

  useEffect(() => {
    if (tabKeys.length > 0 && !activeTab) {
      setActiveTab(tabKeys[0])
    }
  }, [tabKeys, activeTab])

  useEffect(() => {
    setTabChange(true)
    const timeout = setTimeout(() => {
      setTabChange(false)
    }, 999)
    return () => clearTimeout(timeout)
  }, [activeTab])


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
              <div>
                <img className={`client`} alt="" src={icons[post.clients[0]]} />
                <LanguageIcon language={iconsMap[post.languages[0]]} />
                <ProductIcon product={iconsMap[post.productTypes[0]]} />
              </div>
              <div className={`technologies`}>
                {post.technologies.length > 0 && post.technologies.map(tech => {
                  return <TechnologyIcon key={tech} technology={iconsMap[tech]} />
                })}
              </div>
            </div>
          </section>

          {Object.keys(filteredProps).length > 0 && tabKeys.length > 0 &&
            <section className={`tabs animatedBackground ${tabChange ? 'backgroundChange' : ''}`}>
              <div className="tabButtons">
                {tabKeys.map(key => (
                  <button
                    className={`tabButton ${key === activeTab ? 'active' : ''}`}
                    key={key}
                    onClick={() => setActiveTab(key)}
                  >
                    {key}
                  </button>
                ))}
              </div>
              {activeTab && <PageTab activeTab={activeTab} data={filteredProps[activeTab]} tabChange={tabChange} PageFieldList={PageFieldList} />}
            </section>
          }

          <section>
            {post.customData.groups.common.fields.length > 0 && <div className={`customData customDataWrap`}>
              <h4>{post.customData.groups.common.group_title}:</h4>
              {post.customData.groups.common.fields.length > 0 && post.customData.groups.common.fields.map(field => {
                return (
                  <PageFieldList key={field.name} field={field} />
                )
              })}
            </div>}
          </section>

          <section>
            <div className={`tags clients`}>
              {clientsTags.map(tag => (<span key={tag.name} >{tag.name}</span>))}
              {languagesTags.map(tag => (<span key={tag.name} >{tag.name}</span>))}
              {productTypesTags.map(tag => (<span key={tag.name} >{tag.name}</span>))}
            </div>
            <div className={`tags technologies`}>
              {technologiesTags.map(tag => (<span key={tag.name} >{tag.name}</span>))}
            </div>
          </section>

          <section>
            <div className={'date'} style={{ fontSize: '13px' }}>
              Record created: <SvgDisplay value={year} /><SvgDisplay value={month} symbNum={2} /><SvgDisplay value={day} symbNum={2} />
            </div>
          </section>

        </div>
      }
    </>
  )
}
export default PageView