import React from 'react'
import parse from 'html-react-parser'
import EditAcfField from '../auth/editAcfField'

const PageTab = ({ activeTab, data, tabChange, PageFieldListEl }) => {
  return (
    <div className={`customData customDataWrap ${data.content ? 'content' : ''} ${tabChange ? 'changable' : ''} ${data.content ? 'contentRendered' : ''}`}>
      <h4>{activeTab}:</h4>

      {data.fields?.length > 0 && data.fields.map(field => {
        return (
          <PageFieldListEl key={field.name} field={field} />
        )
      })}

      {data.content &&
        <>
          {parse(data.content)}
          <EditAcfField
          // postId={postId} 
          // fieldKey={fieldKey} 
          // currentValue={currentValue} 
          // token={token} 
          />
        </>
      }
    </div>
  )
}
export default PageTab