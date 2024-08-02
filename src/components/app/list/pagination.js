import React from 'react'
// import SvgDisplayWrapper from '../../digitProcessor/svgDisplayWrapper'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Pagination = ({ bottom, page, perPage, setPage, setPerPage, allPages, perPageOptions }) => {

  return (
    <>
      <div
        className={`pagination firstRow ${bottom ? 'bottom' : ''}`}
      >
        {page >= 2 && <button
          onClick={() => page >= 2 && setPage(page - 1)}
        >
          <FaArrowLeft size="1.1em" />
        </button>}

        <h6>
          page:
          <span>{page}</span>
          {/* <span><SvgDisplayWrapper value={page} symbNum={2} /></span> */}
        </h6>

        <h6>
          all pages:
          <span>{allPages}</span>
          {/* <span><SvgDisplayWrapper value={allPages} symbNum={2} /></span> */}
        </h6>

        {page < allPages && <button
          onClick={() => page < allPages && setPage(page + 1)}
        >
          <FaArrowRight size="1.1em" />
        </button>}
      </div>

      <div
        className={`pagination secondRow ${bottom ? 'bottom' : ''}`}
      >
        <span>
          posts per page:
        </span>

        {perPageOptions.length > 0 && perPageOptions.map(el => {
          return (
            <button
              className={`${el === perPage ? 'active' : ''}`}
              key={el}
              onClick={() => setPerPage(el)}
            >
              {el}
            </button>
          )
        })}
      </div>
    </>
  )
}
export default Pagination