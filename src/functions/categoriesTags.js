const categoriesTags = (categories) => {
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
      let catObj = {
        name: '',
        choice: '',
        parent: ''
      }
      if (catId) {
        categories.forEach(cat => {
          let temp = cat.response.filter(obj => catId === obj.id)
          if (temp?.length > 0) {
            catObj = {
              name: temp[0]?.name || '',
              choice: cat.options?.choice || '',
              parent: cat.name || ''
            }
            return
          }
        })
      }
      return catObj
    }
  }
}
export default categoriesTags