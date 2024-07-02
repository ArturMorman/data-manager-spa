import React from 'react'
import { FaGlobe, FaShoppingCart, FaGraduationCap, FaHome } from 'react-icons/fa'
// import { MdWeb } from 'react-icons/md'

const ProductIcon = ({ product }) => {
  const getIcon = (product) => {
    switch (product) {
      case 'Website':
        return <FaGlobe className={`productType`} size="1.5em" />
      // return <MdWeb className={`productType`}  size="1.5em" />
      case 'E-commerce':
        return <FaShoppingCart className={`productType`} size="1.5em" />
      case 'E-learning':
        return <FaGraduationCap className={`productType`} size="1.5em" />
      case 'Landing page':
        return <FaHome className={`productType`} size="1.5em" />
      default:
        return null
    }
  }

  return (
    <>
      {getIcon(product)}
    </>
  )
}
export default ProductIcon