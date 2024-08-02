import React, { useState, useEffect, useCallback } from 'react'
import ListController from './list/listController'
import UiFixed from './globalUI/globalUi'
import ListUI from './list/listUI'
import ListView from './list/listView'
import PageContext from './singlePage/pageContext'
import LoadingPlaceholder from './loadingPlaceholder'
import { usePersistState } from '../../hooks/usePersistState'
import { useStaticQuery, graphql } from "gatsby"


const ListContext = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {          
          siteMetadata {
            wpSiteUrl
            wpRestApi {
              pathBase
              singlePostCustomEndpoint
            }
            wpContentTypes {
              postType
              taxonomies {
                singleChoice
                multiChoice
              }
            }
          }
        }
      }
    `
  )
  const wpSiteUrl = site.siteMetadata.wpSiteUrl
  const pathBase = site.siteMetadata.wpRestApi.pathBase
  const singlePostCustomEndpoint = site.siteMetadata.wpRestApi.singlePostCustomEndpoint
  const route = site.siteMetadata.wpContentTypes.postType
  const api = `${wpSiteUrl}${pathBase}`
  const apiUrl = `${api}${route}`
  const taxonomies = site.siteMetadata.wpContentTypes.taxonomies

  const customLayouts = ['dark', 'sick']
  // const [customLayout, setCustomLayout] = useState(null)
  const [customLayout, setCustomLayout] = usePersistState('layout', true)

  const [panel, setPanel] = usePersistState('showPanel', true)
  const [panelChanged, setPanelChanged] = useState(false)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(18)
  const [allPages, setAllPages] = useState(1)
  const perPageOptions = [6, 12, 18, 24, 30]

  const [errorStatus, setErrorStatus] = useState(null)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const [posts, setPosts] = useState([])
  const [existingTaxIds, setExistingTaxIds] = useState([])

  const [apiPage, setApiPage] = useState(1)
  const pageCtrl = '?page='


  const fetchPosts = useCallback(() => {
    setLoading(true);
    fetch(`${apiUrl}/${pageCtrl}${apiPage}&per_page=100`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.code !== "rest_no_route") {
            setResponse(result);
          } else {
            setErrorStatus(result.code);
          }
          setLoading(false);
        },
        (error) => {
          setErrorStatus(error);
          setLoading(false);
        }
      );
  }, [apiPage]);


  useEffect(() => {
    fetchPosts()
  }, [])


  useEffect(() => {
    if (!response) return
    const temp = response.flatMap(post =>
      [...post.clients, ...post.productTypes, ...post.languages, ...post.technologies]
    )
    setPosts(response)
    setExistingTaxIds([...new Set(temp)])
  }, [response])


  useEffect(() => {
    setPanelChanged(true)
    const timeout = setTimeout(() => {
      setPanelChanged(false)
    }, 366)
    return () => clearTimeout(timeout)
  }, [panel])


  // console.log(window.matchMedia('(prefers-color-scheme: dark)'))


  return (
    <>
      <div className={`${customLayout ? `${customLayout}Mode` : ''} container appWrap ${panel ? 'listView' : 'postView'} ${loading ? 'loading' : ''}`}>

        <UiFixed
          customLayouts={customLayouts}
          customLayout={customLayout}
          setCustomLayout={setCustomLayout}
          panel={panel}
          setPanel={setPanel}
          panelChanged={panelChanged}
        />

        {existingTaxIds.length > 0 ?
          <ListController
            api={api}
            taxonomies={taxonomies}
            existingTaxIds={existingTaxIds}
            posts={posts}
            page={page}
            perPage={perPage}
            setAllPages={setAllPages}
          >
            <ListUI
              panel={panel}
              setPanel={setPanel}
              panelChanged={panelChanged}
            />
            <ListView
              panel={panel}
              setPanel={setPanel}
              loading={loading}
              page={page}
              perPage={perPage}
              allPages={allPages}
              setPage={setPage}
              setPerPage={setPerPage}
              perPageOptions={perPageOptions}
            >
              <PageContext
                api={api}
                route={route}
                singlePostCustomEndpoint={singlePostCustomEndpoint}
                panel={panel}
              />
            </ListView>
          </ListController>
          :
          <LoadingPlaceholder view={'listView'} text={'loading app...'} />
        }

      </div>

      <footer className={`${panel ? 'listView' : 'postView'}`}>
        <div className={`container`}>
          <h5>Digital VooDoo</h5>
        </div>
      </footer>
    </>
  )
}
export default ListContext