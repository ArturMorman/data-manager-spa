import React from 'react'
import { DiWordpress, DiReact } from 'react-icons/di'
import { SiWoo, SiGatsby, SiApache, SiNginx, SiWebmin, SiPlesk, SiNextdotjs, SiRootsbedrock, SiTailwindcss, SiComposer } from 'react-icons/si'

const TechnologyIcon = ({ technology }) => {
  const classNamePattern = `technology`
  const getIcon = (tech) => {
    switch (tech) {
      case 'Wordpress':
        return <DiWordpress title={`${tech}`} className={classNamePattern} size="1.6em" color="#21759B" />
      case 'Woocommerce':
        return <SiWoo title={`${tech}`} className={classNamePattern} size="1.5em" color="#96588A" />
      case 'React js':
        return <DiReact title={`${tech}`} className={classNamePattern} size="1.8em" color="#61DAFB" />
      case 'Gatsby js':
        return <SiGatsby title={`${tech}`} className={classNamePattern} size="1.5em" color="#663399" />
      case 'Apache':
        return <SiApache title={`${tech}`} className={classNamePattern} size="1.55em" color="#D22128" />
      case 'Nginx':
        return <SiNginx title={`${tech}`} className={classNamePattern} size="1.5em" color="#00B140" />
      case 'Webmin':
        return <SiWebmin title={`${tech}`} className={classNamePattern} size="1.5em" color="#043BAB" />
      case 'Plesk':
        return <SiPlesk title={`${tech}`} className={classNamePattern} size="1.7em" color="#000000" />
      case 'Next js':
        return <SiNextdotjs title={`${tech}`} className={classNamePattern} size="1.5em" color="#0F0F0F" />
      case 'Bedrock':
        return <SiRootsbedrock title={`${tech}`} className={classNamePattern} size="1.5em" color="#005DDC" />
      case 'Tailwind':
        return <SiTailwindcss title={`${tech}`} className={classNamePattern} size="1.5em" color="#0EA5E9" />
      case 'Composer':
        return <SiComposer title={`${tech}`} className={classNamePattern} size="1.6em" color="#0F0F0F" />
      default:
        return null
    }
  }

  return (
    <>
      {getIcon(technology)}
    </>
  )
}
export default TechnologyIcon