import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci'

const EditACFField = ({ postId, fieldKey, currentValue, authToken, isAuthenticated }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [value, setValue] = useState(currentValue)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('https://morman.com.pl/data-manager-wp/wp-json/custom/v1/update-acf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        post_id: postId,
        fields: {
          [fieldKey]: value
        }
      })
    })

    const data = await response.json()

    if (response.ok) {
      setMessage('Field updated successfully!')
    } else {
      setMessage(`Error: ${data.message}`)
    }
  }

  // console.log(fieldKey)

  return (
    <>
      {showPopup ?
        <>
          {isAuthenticated ?
            <form className={`edidAcfForm`} onSubmit={handleSubmit}>
              <label>
                <span>Current Value:</span>
                <span><strong>{typeof currentValue === 'boolean' ? currentValue.toString() : currentValue}</strong></span>
                <span>New Value:</span>
                <input type="text" value={value} onChange={handleChange} />
              </label>
              <button type="submit">Update</button>
              <p>{message}</p>
            </form>
            :
            <div className={`edidAcfForm denied`}><h4>Only logged in users can change data value</h4></div>
          }
          <span onClick={() => setShowPopup(false)} className={`closePopup`}></span>
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