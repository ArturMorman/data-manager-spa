const categoryHandle = (id, parent, choice, activeCategories, setActiveCategories, activeTaxonomy, setActiveTaxonomy) => {
  if (!activeCategories.includes(id)) {
    if (choice === 'singleChoice') {
      if (!activeTaxonomy.includes(parent)) {
        setActiveCategories(prev => [...prev, id])
        setActiveTaxonomy(prev => [...prev, parent])
      }
    }
    else {
      setActiveCategories(prev => [...prev, id])
    }
  }
  else if (activeCategories.includes(id)) {
    setActiveCategories(prev => [...prev.filter(el => el !== id)])
    if (choice === 'singleChoice') {
      if (activeTaxonomy.includes(parent)) {
        setActiveTaxonomy(prev => [...prev.filter(el => el !== parent)])
      }
    }
  }
}
export default categoryHandle