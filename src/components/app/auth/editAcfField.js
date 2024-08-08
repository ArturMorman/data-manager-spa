import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci'

const EditACFField = ({ postId, fieldKey, currentValue, token }) => {
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
        'Authorization': `Bearer ${token}`
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

  return (
    <>
      {showPopup ?
        <form onSubmit={handleSubmit}>
          <label>
            Edit Field:
            <input type="text" value={value} onChange={handleChange} />
          </label>
          <button type="submit">Update</button>
          <p>{message}</p>
        </form>
        :
        <CiEdit title='Edit property value' size='1.9em' className={`editAcf`} />
        // ''
      }
    </>
  )
}

export default EditACFField