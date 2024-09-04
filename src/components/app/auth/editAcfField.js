import React, { useState } from 'react'
import DOMPurify from 'dompurify'
import { CiEdit } from 'react-icons/ci'
import { GrClose } from 'react-icons/gr'

const EditACFField = ({ postId, fieldKey, fieldType, currentValue, authToken, isAuthenticated, fetchPost }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [value, setValue] = useState(currentValue)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    if (fieldType === 'true_false') {
      setValue(e.target.checked)
    } else {
      setValue(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const sanitizedValue = DOMPurify.sanitize(value, { ALLOWED_ATTR: ['href', 'src', 'title'] })

    const isTextArea = fieldType === 'textarea'

    const requestBody = isTextArea
      ? { content: sanitizedValue }
      : { post_id: postId, fields: { [fieldKey]: sanitizedValue } }

    const targetRoute = isTextArea
      ? `https://morman.com.pl/data-manager-wp/wp-json/wp/v2/ProjectsData/${postId}`
      : 'https://morman.com.pl/data-manager-wp/wp-json/custom/v1/update-acf'

    const method = isTextArea ? 'PUT' : 'POST'

    const response = await fetch(targetRoute, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(requestBody)
    })

    const data = await response.json()

    if (response.ok) {
      setMessage('Field updated successfully!')
      // setTimeout(() => fetchPost(), 1000)
      fetchPost()
    } else {
      setMessage(`Error: ${data.message}`)
    }
  }

  return (
    <>
      {showPopup ?
        <>
          <button
            onClick={() => setShowPopup(false)}
            onKeyDown={(e) => e.key === 'Enter' && setShowPopup(false)}
            className={`closeEditor`}
            title="Close Date Edit Section"
          >
            <GrClose size='1em' />
          </button>
          {isAuthenticated ?
            <form className={`edidAcfForm`} onSubmit={handleSubmit}>

              <span><strong>New Value:</strong></span>

              {fieldType === 'true_false' ?
                <input
                  type="checkbox"
                  value={!!value}
                  checked={!!value}
                  onChange={handleChange}
                />
                :
                (fieldType === 'textarea') ?
                  <textarea
                    rows="18"
                    value={value}
                    onChange={handleChange}
                  />
                  :
                  <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                  />
              }

              <button title="Update Data Value" type="submit">Update</button>
              <span><strong>{message}</strong></span>
            </form>
            :
            <div className={`edidAcfForm denied error`}><strong>Only logged in users can change data value</strong></div>
          }
        </>
        :
        <button
          className={`editAcf`}
          title='Edit property value'
          onClick={() => setShowPopup(true)}
        >
          <CiEdit
            size='1.9em'
          />
        </button>
      }
    </>
  )
}

export default EditACFField