import React, { useState, useEffect } from 'react'


const ListController = ({ children, api, taxonomies, existingTaxIds, posts, page, perPage, setAllPages }) => {

  const [errorStatus, setErrorStatus] = useState(null)
  const [response, setResponse] = useState(null)
  // const [loadingTaxonomies, setloadingTaxonomies] = useState(false)
  const [loadingTaxonomies, setloadingTaxonomies] = useState(true)

  const [categories, setCategories] = useState([])
  const [activeTaxonomy, setActiveTaxonomy] = useState([])
  const [activeCategories, setActiveCategories] = useState([])
  const [postsFiltered, setPostsFiltered] = useState([])
  const [existingTaxIdsFiltered, setExistingTaxIdsFiltered] = useState([])
  const [listPagePostsPortion, setListPagePostsPortion] = useState([])
  const [somethingSelected, setSomethingSelected] = useState(false)

  const [fetchWatcher, setfetchWatcher] = useState(0)


  useEffect(() => {
    if (taxonomies) {


      // setloadingTaxonomies(true)


      const fetchAllCategories = async () => {
        try {
          const results = await Promise.allSettled(
            Object.entries(taxonomies).flatMap(([choice, taxArray]) =>
              taxArray.map(taxonomy =>
                fetchCategories(taxonomy, { choice, order: getOrder(taxonomy) })
              )
            )
          )
        } catch (error) {
          setErrorStatus(error)
        } finally {


          // setloadingTaxonomies(false)
          console.log('')


        }
      }
      fetchAllCategories()
    }
  }, [])

  const fetchCategories = (taxonomy, options) => {
    return fetch(`${api}${taxonomy}?page=1&per_page=100`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(result => {
        if (result.code !== "rest_no_route") {
          setResponse({
            name: taxonomy,
            response: result,
            options: options
          })
        } else {
          throw new Error(result.code)
        }
      })
  }

  const getOrder = (taxonomy) => {
    switch (taxonomy) {
      case 'clients': return 1;
      case 'productTypes': return 2;
      case 'technologies': return 3;
      default: return 4;
    }
  }


  ////  FUNCTION TO FILTER OUT CATEGORIES NOT ATTACHED TO ANY PROJECT
  const filterOutCategories = (categories) => {


    // console.log('|| filterOutCategories:  ', categories)


    let categoriesFiltered = []
    if (categories?.response?.length > 0) {
      categoriesFiltered = categories.response.filter(el => {
        return existingTaxIds.includes(el.id)
      })
    }

    return categoriesFiltered.length > 0 ? {
      name: categories.name,
      options: categories.options,
      response: categoriesFiltered
    } : categories
  }


  useEffect(() => {

    if (response && response.name && response.response) {
      if (categories.length > 0) {
        const existing = categories.map(el => el.name)


        // console.log('| existing: ', existing)


        if (!existing.includes(response.name)) {
          setCategories(prev => [...prev, filterOutCategories(response)])
        }

        // else if(existing.includes(response.name)) {
        //   ////      DOPISAC OBSLUGE UPDATE TAXONOMY ??????
        // }

      }
      else {
        setCategories([filterOutCategories(response)])
      }
    }
  }, [response])



  // console.log('###: ', categories)
  // console.log('###: ', Object.entries(taxonomies))



  useEffect(() => {
    setfetchWatcher(prev => prev + 1)
  }, [categories])


  useEffect(() => {


    if (Object.entries(taxonomies).flat().length + 1 === fetchWatcher) {
      setloadingTaxonomies(false)
    }


  }, [fetchWatcher])


  useEffect(() => {
    if (!loadingTaxonomies) {
      console.log('_  loadingTaxonomies CATEGORIES DONE CORRECT  _')
    }
  }, [loadingTaxonomies])


  // console.log('###: ', fetchWatcher)
  // console.log('!!!: ', loadingTaxonomies)





  //  FILTER POSTS LIST
  useEffect(() => {
    if (activeCategories.length > 0) {
      if (posts?.length > 0) {
        const temp = posts.filter(post => {
          const pass = activeCategories.filter(cat => [...post.clients, ...post.productTypes, ...post.languages, ...post.technologies].includes(cat))
          return pass.length === activeCategories.length
        })
        setPostsFiltered(temp)
        setAllPages(Math.ceil(temp.length / perPage))
      }
    }
    else {
      setPostsFiltered(posts)
      posts && setAllPages(Math.ceil(posts.length / perPage))
      setActiveTaxonomy([])
    }
  }, [activeCategories, posts, perPage])


  // CURRENT POSTS LIST PAGE POSTS PORTION
  useEffect(() => {
    if (postsFiltered?.length > 0 && page && perPage) {
      const firstIndex = (page - 1) * perPage
      const lastIndex = page * perPage
      setListPagePostsPortion([...postsFiltered.slice(firstIndex, lastIndex)])
    }
  }, [postsFiltered, page, perPage])


  // CREAT ARRAY WITH EXISTING TAXONOMY/CATEGORY IDs, AFTER CURRENT FILTERING
  useEffect(() => {
    const taxonomyIds = postsFiltered.flatMap(post =>
      [...post.clients, ...post.productTypes, ...post.languages, ...post.technologies]
    )
    setExistingTaxIdsFiltered([...new Set(taxonomyIds)])
  }, [postsFiltered])


  useEffect(() => {
    setSomethingSelected(true)
    const timeout = setTimeout(() => {
      setSomethingSelected(false)
    }, 999)
    return () => clearTimeout(timeout)
  }, [activeCategories])



  // console.log('__ RESPONSE:                 ', response)

  // console.log('__ categories:               ', categories)
  // console.log('__ existing tax ids filtered: ', existingTaxIdsFiltered)

  // console.log('__ active categories:        ', activeCategories)
  // console.log('__ active taxonomies:        ', activeTaxonomy)



  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, {
      loadingTaxonomies,
      categories,
      activeTaxonomy,
      setActiveTaxonomy,
      activeCategories,
      setActiveCategories,
      posts: listPagePostsPortion,
      taxIdsFiltered: existingTaxIdsFiltered,
      listState: {
        count: postsFiltered ? postsFiltered.length : null,
        postsFilteredOut: (postsFiltered && posts) ? posts.length - postsFiltered.length : 0
      },
      somethingSelected: somethingSelected
    }),
  )


  return (
    <>
      {childrenWithProps}
    </>
  )
}
export default ListController