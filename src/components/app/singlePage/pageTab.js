import React from 'react'
import parse from 'html-react-parser'
import EditAcfField from '../auth/editAcfField'

const PageTab = ({ activeTab, data, tabChange, PageFieldListEl, isAuthenticated, postId, authToken }) => {
  console.log(data)
  return (
    <div className={`customData customDataWrap ${data.content ? 'content' : ''} ${tabChange ? 'changable' : ''} ${data.content ? 'contentRendered' : ''}`}>
      <h4>{activeTab}:</h4>

      {data.fields?.length > 0 && data.fields.map(field => {
        return (
          <PageFieldListEl key={field.name} field={field} isAuthenticated={isAuthenticated} postId={postId} authToken={authToken} />
        )
      })}

      {data.content &&
        <>
          {parse(data.content)}
          <EditAcfField
            postId={postId}
            fieldLabel={'content'}
            fieldKey={'content'}
            currentValue={parse(data.content)}
            authToken={authToken}
            isAuthenticated={isAuthenticated}
          />
        </>
      }
    </div>
  )
}
export default PageTab