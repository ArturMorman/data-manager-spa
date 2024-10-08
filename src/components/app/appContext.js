import React, { useState, useEffect, useCallback } from 'react'
import ListController from './list/listController'
import GlobalUi from './globalUI/globalUi'
import ListUI from './list/listUI'
import ListView from './list/listView'
import PageContext from './singlePage/pageContext'
import LoadingPlaceholder from './loadingPlaceholder'
import { usePersistState } from '../../hooks/usePersistState'
import { useStaticQuery, graphql } from "gatsby"


const AppContext = () => {
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

  const [lastVisited, setLastVisited] = usePersistState('lastVisited', [])
  const lastVisitedLimit = 8

  const customLayouts = ['dark', 'night-hunt', 'salty-pistachio']
  const [customLayout, setCustomLayout] = usePersistState('layout', true)

  const [showSidebar, setShowSidebar] = usePersistState('sidebar', true)
  const [panel, setPanel] = usePersistState('showPanel', true)
  const [panelChanged, setPanelChanged] = useState(false)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(18)
  const [allPages, setAllPages] = useState(1)
  const perPageOptions = [6, 12, 18, 24, 30]

  const [selectedObj, setSelectedObj] = useState(null)

  const [errorStatus, setErrorStatus] = useState(null)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const [posts, setPosts] = useState([])
  const [existingTaxIds, setExistingTaxIds] = useState([])

  const [apiPage, setApiPage] = useState(1)
  const pageCtrl = '?page='

  const [authToken, setAuthToken] = usePersistState('token', null)
  const [username, setUsername] = usePersistState('user', null)
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!authToken)


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

  const handleLogin = (data) => {
    setAuthToken(data?.token)
    setUsername(data.user_nicename)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setAuthToken(null)
    setIsAuthenticated(false)
  }


  const handleLastVisited = (postId, postTitle) => {

    let temp = []

    if (lastVisited?.length > 0) {
      if (lastVisited?.length >= lastVisitedLimit) {
        temp = lastVisited.slice(lastVisited.length - lastVisitedLimit + 1, lastVisitedLimit - 1).filter(el => {
          return el.id !== postId
        })
      }
      else {
        temp = lastVisited.filter(el => {
          return el.id !== postId
        })
      }
    }

    setLastVisited([...temp, {
      id: postId,
      name: postTitle
    }])

  }


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


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [showSidebar])


  console.log('__SIDEBAR    ', showSidebar)


  return (
    <>
      <div className={`${customLayout ? `${customLayout}Mode` : ''} container appWrap ${panel ? 'listView' : 'postView'} ${loading ? 'loading' : ''}`}>

        <GlobalUi
          customLayouts={customLayouts}
          customLayout={customLayout}
          setCustomLayout={setCustomLayout}
          panel={panel}
          setPanel={setPanel}
          panelChanged={panelChanged}
          onLogout={handleLogout}
          onLogin={handleLogin}
          wpSiteUrl={wpSiteUrl}
          isAuthenticated={isAuthenticated}
          username={username}
          lastVisited={lastVisited}
          handleLastVisited={handleLastVisited}
          selectedObj={selectedObj}
          setSelectedObj={setSelectedObj}
        />

        {/* <div className={`${!showSidebar ? '' : 'theList'} ${panel ? 'listView' : 'postView'}`}> */}

        {existingTaxIds.length > 0 ?
          <ListController
            api={api}
            taxonomies={taxonomies}
            existingTaxIds={existingTaxIds}
            posts={posts}
            page={page}
            perPage={perPage}
            setAllPages={setAllPages}
            panel={panel}
            showSidebar={showSidebar}
          >
            <ListUI
              panel={panel}
              setPanel={setPanel}
              panelChanged={panelChanged}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
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
              handleLastVisited={handleLastVisited}
              selectedObj={selectedObj}
              setSelectedObj={setSelectedObj}
            >
              <PageContext
                api={api}
                route={route}
                singlePostCustomEndpoint={singlePostCustomEndpoint}
                panel={panel}
                isAuthenticated={isAuthenticated}
                authToken={authToken}
              />
            </ListView>
          </ListController>
          :
          <LoadingPlaceholder view={'listView'} text={'loading app...'} />
        }

        {/* </div> */}

      </div>

      <footer className={`${customLayout ? `${customLayout}Mode` : ''} ${panel ? 'listView' : 'postView'}`}>
        <div className={`container`}>
          <h5>Digital VooDoo</h5>
        </div>
      </footer>
    </>
  )
}
export default AppContext