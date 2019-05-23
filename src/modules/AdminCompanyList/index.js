import React, { Component } from 'react';
import Pagination from '../../components/Pagination'

let pagination = {
    activePage: 1,
    pageSize: 10,
    pages: ['1212', '12121'],
    totalPage: 20150

}

class AdminCompanyList extends Component {

    onPageChange() {
        return {}
    }

    onPageSizeChange() {
        return {}
    }

    render() {
        return (
            <Pagination
                {...pagination}
                onPageChange={this.onPageChange}
                onPageSizeChange={this.onPageSizeChange}
            />
        )
    }
}

export default AdminCompanyList
