import React, { useEffect, useState } from 'react'
import PageView from './pageView'
import LoadingPlaceholder from '../../loadingPlaceholder'
import { usePersistState } from '../../../hooks/usePersistState'


const PageContext = ({ post, icons, iconsMap, api, route, singlePostCustomEndpoint, categories, panel }) => {

  const [currentPageID, setCurrentPageID] = usePersistState('currentPageId', (post && post.id) ? post.id : null)
  const [currentPage, setCurrentPage] = useState(null)

  const [errorStatus, setErrorStatus] = useState(null)
  const [loading, setLoading] = useState(false)


  console.log(post)
  console.log(currentPageID)

  const fetchPost = () => {
    setLoading(true)

    fetch(
      `${api}${route}/${currentPageID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(res => res.json())
      .then(
        (result) => {
          if (result.code !== "rest_no_route") {

            return fetch(

              `${api}${singlePostCustomEndpoint}/${currentPageID}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              }

            )
              .then(res => res.json())
              .then(
                (customRes) => {
                  setCurrentPage({ ...result, customData: customRes })
                  setLoading(false)
                },
                (errorStatus) => {
                  setErrorStatus(errorStatus)
                  setLoading(false)
                }
              )

          }
          else {
            setErrorStatus(result.code)
            setLoading(false)
          }
        },
        (errorStatus) => {
          setErrorStatus(errorStatus)
          setLoading(false)
        }
      )
  }

  useEffect(() => {
    if (post && post.id) {
      setCurrentPageID(post.id)
      setCurrentPage(null)
    }
  }, [post])

  useEffect(() => {
    (currentPage && currentPage.id) && setCurrentPageID(currentPage.id)
  }, [currentPage])

  useEffect(() => {
    fetchPost()
  }, [currentPageID])



  // useEffect(() => {
  //   console.log('loading...')
  // }, [currentPage])



  return (
    <>
      {!panel && <div className={`pageContext ${panel ? 'listView' : 'postView'}`}>
        {currentPage &&
          <PageView post={currentPage} icons={icons} iconsMap={iconsMap} categories={categories} />
        }
        {loading && <LoadingPlaceholder view={'pageView'} text={'loading single project...'} />}
      </div>}
    </>
  )
}
export default PageContext