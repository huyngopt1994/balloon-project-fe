import React from 'react'
import PropTypes from 'prop-types'

const PageButton = ({ children, disabled, onClick }) => {
  if (disabled) {
    return (
      <span className="page-link">{children}</span>
    )
  }
  return (
    <a className="page-link" href="#" onClick={onClick}>{children}</a>
  )
}

PageButton.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default PageButton
