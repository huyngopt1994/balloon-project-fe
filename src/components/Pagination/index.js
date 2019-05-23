import React from 'react'
import PropTypes from 'prop-types'
import { Pagination as BsPagination } from 'react-bootstrap'
import PageButton from './PageButton'
import PageSize from './PageSize'
import style from './style.scss'

const Pagination = ({ activePage, pageSize, totalPage, onPageChange, onPageSizeChange }) => {
  if (totalPage <= 0) {
    return <div />
  }
  return (
    <div className={style.container}>
      {/*<PageSize*/}
        {/*value={pageSize}*/}
        {/*onChange={onPageSizeChange}*/}
      {/*/>*/}
      <BsPagination
        // prev
        // next
        // first
        // last
        // ellipsis
        // boundaryLinks
        // bsClass="pagination"
        // buttonComponentClass={PageButton}
        // items={totalPage}
        // maxButtons={5}
        // activePage={activePage}
        // onSelect={page => onPageChange({ page, pageSize })}
      />
    </div>
  )
}

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  totalPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
}

export default Pagination
