import React from 'react'

const LoadingPlaceholder = ({ view, text }) => {
  return (
    <div className={`loadingPlaceholder ${view ? view : ''}`}>

      <div className={`text`}>
        {text || ''}
      </div>

    </div>
  )
}
export default LoadingPlaceholder