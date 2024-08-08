import React from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import EditAcfField from '../auth/editAcfField'

const PageFieldListEl = ({ field }) => {
  return (
    <>
      {field.type === "text" && field.value &&
        <div>
          <h5>{field.label}:</h5>
          <span>{field.value}</span>
          <EditAcfField
          // postId={postId} 
          // fieldKey={fieldKey} 
          // currentValue={currentValue} 
          // token={token} 
          />
        </div>
      }
      {field.type === "true_false" &&
        <div>
          <h5>{field.label}:</h5>
          <span
            className={`bool ${field.value ? 'true' : ''}`}
          >
            {field.value ?
              <FaCheckCircle size="1.5em" />
              :
              <FaTimesCircle size="1.5em" />
            }
          </span>
          <EditAcfField
          // postId={postId} 
          // fieldKey={fieldKey} 
          // currentValue={currentValue} 
          // token={token} 
          />
        </div>
      }
    </>
  )
}
export default PageFieldListEl