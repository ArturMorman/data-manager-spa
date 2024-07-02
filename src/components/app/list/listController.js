import React, { useState, useEffect } from 'react'


const ListController = ({ children, api, taxonomies, existingTaxIds, posts, page, perPage, setAllPages }) => {

  const [errorStatus, setErrorStatus] = useState(null)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const [categories, setCategories] = useState([])
  const [activeTaxonomy, setActiveTaxonomy] = useState([])
  const [activeCategories, setActiveCategories] = useState([])
  const [postsFiltred, setPostsFiltred] = useState([])
  const [existingTaxIdsFiltred, setExistingTaxIdsFiltred] = useState([])
  const [listPagePostsPortion, setListPagePostsPortion] = useState([])
  const [somethingSelected, setSomethingSelected] = useState(false)


  const fetchCategories = (taxonomy, options = {}) => {
    fetch(
      `${api}${taxonomy}?page=1&per_page=100`,
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
            setResponse({
              name: taxonomy,
              response: result,
              options: options
            })
            setLoading(false)
          }
          else {

            console.log("**** rest_no_route SITUATION ****")

            setErrorStatus(result.code)
            setLoading(false)
          }
        },
        (errorStatus) => {

          console.log(`**** ERROR FETCHING ${taxonomy} ****`, errorStatus)

          setErrorStatus(errorStatus)
          setLoading(false)
        }
      )
  }

  useEffect(() => {
    if (taxonomies) {
      setLoading(true)
      Object.keys(taxonomies).forEach(arr => {
        taxonomies[arr].forEach(taxonomy => {
          fetchCategories(taxonomy, {
            choice: arr,
            ////  BEAUTIFUL HARDCODE  !!!
            order: taxonomy === 'clients' ? 1 : taxonomy === 'productTypes' ? 2 : taxonomy === 'technologies' ? 3 : 4
          })
        })
      });
    }
  }, [])


  ////  FUNCTION TO FILTER OUT CATEGORIES NOT ATTACHED TO ANY PROJECT
  const filterOutCategories = (categories) => {

    console.log('|| filterOutCategories:  ', categories)

    let categoriesFiltred = []
    if (categories && typeof categories.response !== 'undefined' && categories.response.length > 0) {
      categoriesFiltred = categories.response.filter(el => {
        return existingTaxIds.includes(el.id)
      })
    }

    return categoriesFiltred.length > 0 ? {
      name: categories.name,
      options: categories.options,
      response: categoriesFiltred
    } : categories
  }


  useEffect(() => {

    if (response && response.name && response.response) {
      if (categories.length > 0) {
        const existing = categories.map(el => el.name)

        console.log('| existing: ', existing)

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
  // }, [response, categories])


  //  FILTER POSTS LIST
  useEffect(() => {
    if (activeCategories.length > 0) {
      if (posts && posts.length > 0) {
        const temp = posts.filter(post => {
          const pass = activeCategories.filter(cat => [...post.clients, ...post.productTypes, ...post.languages, ...post.technologies].includes(cat))
          return pass.length === activeCategories.length
        })
        setPostsFiltred(temp)
        setAllPages(Math.ceil(temp.length / perPage))
      }
    }
    else {
      setPostsFiltred(posts)
      posts && setAllPages(Math.ceil(posts.length / perPage))
      setActiveTaxonomy([])
    }
  }, [activeCategories, posts, perPage])


  // CURRENT POSTS LIST PAGE POSTS PORTION
  useEffect(() => {
    if (postsFiltred?.length > 0 && page && perPage) {
      const firstIndex = 0 + page * perPage - perPage
      const lastIndex = 0 + page * perPage
      setListPagePostsPortion([...postsFiltred.slice(firstIndex, lastIndex)])
    }
  }, [postsFiltred, page, perPage])


  // CREAT ARRAY WITH EXISTING TAXONOMY/CATEGORY IDs, AFTER CURRENT FILTERING
  useEffect(() => {
    let temp = []
    let temp2 = []
    if (postsFiltred && postsFiltred.length > 0) {
      temp2 = postsFiltred.map(post => {
        const temp2 = [...post.clients, ...post.productTypes, ...post.languages, ...post.technologies]
        return temp2
      })
      temp2.forEach(el => {
        temp.push(...el)
      })
    }
    setExistingTaxIdsFiltred([...new Set(temp)])
  }, [postsFiltred])


  useEffect(() => {
    setSomethingSelected(true)
    const timeout = setTimeout(() => {
      setSomethingSelected(false)
    }, 999)
    return () => clearTimeout(timeout)
  }, [activeCategories])



  // console.log('-- posts filtred:   ', postsFiltred)

  console.log('__ RESPONSE:                 ', response)
  // console.log('__ categories:               ', categories)
  // console.log('__ existing tax ids filtred: ', existingTaxIdsFiltred)

  // console.log('__ active categories:        ', activeCategories)
  // console.log('__ active taxonomies:        ', activeTaxonomy)



  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, {
      loadingTaxonomies: loading,
      categories: categories,
      activeTaxonomy: activeTaxonomy,
      setActiveTaxonomy: setActiveTaxonomy,
      activeCategories: activeCategories,
      setActiveCategories: setActiveCategories,
      posts: listPagePostsPortion,
      taxIdsFiltred: existingTaxIdsFiltred,
      listState: {
        count: postsFiltred ? postsFiltred.length : null,
        postsFiltredOut: (postsFiltred && posts) ? posts.length - postsFiltred.length : 0
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