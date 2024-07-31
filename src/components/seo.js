import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

function Seo({ description, children, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            titleOptions
            interval
            initialInterval
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title || ''
  const titlesFromConfig = site.siteMetadata?.titleOptions || [defaultTitle]
  const interval = site.siteMetadata?.interval || 2000
  const initialInterval = site.siteMetadata?.initialInterval || interval
  const titles = [title, ...titlesFromConfig.filter(t => t !== title)]

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [dynamicTitle, setDynamicTitle] = useState(titles[0])

  useEffect(() => {
    let initialTimeout
    let titleInterval

    if (titles.length > 1) {
      initialTimeout = setTimeout(() => {
        setCurrentTitleIndex(1)
      }, initialInterval)

      titleInterval = setInterval(() => {
        setCurrentTitleIndex(prevIndex => (prevIndex + 1) % titles.length)
      }, interval)
    }

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(titleInterval)
    }
  }, [titles, initialInterval, interval])

  useEffect(() => {
    setDynamicTitle(titles[currentTitleIndex])
  }, [currentTitleIndex, titles])

  return (
    <Helmet>
      <title>{dynamicTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={dynamicTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={dynamicTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </Helmet>
  )
}
export default Seo