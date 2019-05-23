import React from 'react'
import PropTypes from 'prop-types'
// import SingleSelect from '../SingleSelect'

const PAGE_SIZE_OPTIONS = [
  { label: 5, value: 5 },
  { label: 10, value: 10 },
  { label: 20, value: 20 },
  { label: 50, value: 50 },
]

const PageSize = ({ value = 10, onChange }) => (
  <div className="page-size">
    <div className="size-label">Page Size</div>
    <div className="size-select">
      {/*<SingleSelect*/}
        {/*value={PAGE_SIZE_OPTIONS.find((option) => option.value === value)}*/}
        {/*onChange={opt => onChange(opt.value)}*/}
        {/*isClearable={false}*/}
        {/*getOptionValue={(option) => option.value}*/}
        {/*getOptionLabel={(option) => option.label}*/}
        {/*options={PAGE_SIZE_OPTIONS}*/}
      {/*/>*/}
    </div>
  </div>
)

PageSize.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default PageSize
