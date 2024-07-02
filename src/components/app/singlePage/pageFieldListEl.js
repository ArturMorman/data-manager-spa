import React from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


const PageFieldList = ({ field }) => {
  return (
    <>
      {field.type === "text" && field.value &&
        <div><h5>{field.label}</h5><span>{field.value}</span></div>
      }
      {field.type === "true_false" &&
        <div><h5>{field.label}</h5><span className={`bool ${field.value ? 'true' : ''}`}>{field.value ?
          <FaCheckCircle size="1.5em" />
          :
          <FaTimesCircle size="1.5em" />
        }</span></div>
      }
    </>
  )
}
export default PageFieldList