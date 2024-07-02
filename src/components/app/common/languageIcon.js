import React from 'react'
import Flag from 'react-world-flags'

const LanguageFlag = ({ language }) => {
  const getFlagCode = (lang) => {
    switch (lang) {
      case 'EN':
        return 'GB'
      case 'DE':
        return 'DE'
      case 'NL':
        return 'NL'
      case 'FR':
        return 'FR'
      case 'PL':
        return 'PL'
      default:
        return null
    }
  }

  return (
    <>
      {getFlagCode(language) && (
        <Flag className={`language`} code={getFlagCode(language)} height="16" />
      )}
    </>
  )
}
export default LanguageFlag