import React from 'react'
import { Pagination as BsPagination } from 'react-bootstrap'
import PageButton from './PageButton'
import style from './style.scss'

const Pagination = ({ activePage, totalPage }) => {
    if (totalPage <= 0) {
        return <div/>
    }
    return (
        <div className={style.container}>
            <BsPagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                bsClass="pagination"
                buttonComponentClass={PageButton}
                items={totalPage}
                maxButtons={5}
                activePage={activePage}
            />
        </div>
    )
}


export default Pagination
