import React from 'react'
import parse from 'html-react-parser'

const PageTab = ({ activeTab, data, tabChange, PageFieldList }) => {

  return (
    <div className={`customData customDataWrap ${data.content ? 'content' : ''} ${tabChange ? 'changable' : ''}`}>
      <h4>{activeTab}:</h4>

      {data.fields?.length > 0 && data.fields.map(field => {
        return (
          <PageFieldList key={field.name} field={field} />
        )
      })}

      {data.content && parse(data.content)}
    </div>
  )
}
export default PageTab