function categoriesTags(categories) {
  return {
    clientsTags: (post) => {
      let clientsTags = []
      if (post) {
        categories.forEach(cat => {
          let temp = []
          temp = cat.response.filter(obj => post.clients.includes(obj.id))
          clientsTags = [...clientsTags, ...temp]
        })
      }
      return clientsTags
    },
    technologiesTags: (post) => {
      let technologiesTags = []
      if (post) {
        categories.forEach(cat => {
          let temp = []
          temp = cat.response.filter(obj => post.technologies.includes(obj.id))
          technologiesTags = [...technologiesTags, ...temp]
        })
      }
      return technologiesTags
    },
    productTypesTags: (post) => {
      let productTypesTags = []
      if (post) {
        categories.forEach(cat => {
          let temp = []
          temp = cat.response.filter(obj => post.productTypes.includes(obj.id))
          productTypesTags = [...productTypesTags, ...temp]
        })
      }
      return productTypesTags
    },
    languagesTags: (post) => {
      let languagesTags = []
      if (post) {
        categories.forEach(cat => {
          let temp = []
          temp = cat.response.filter(obj => post.languages.includes(obj.id))
          languagesTags = [...languagesTags, ...temp]
        })
      }
      return languagesTags
    },
    catNameById: (catId) => {
      let catName = ''
      if (catId) {
        let temp = []
        categories.forEach(cat => {
          let temp2 = cat.response.filter(obj => catId === obj.id)
          temp = [...temp, ...temp2]
        })
        catName = temp[0]?.name || ''
      }
      return catName
    }
  }
}
export default categoriesTags