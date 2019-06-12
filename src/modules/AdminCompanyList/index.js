import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { getCompanyList } from '../../api'
import Navigator from '../../components/AdminNav'
import { convertUtcTimeToLocalTime } from '../../utils'
import Pagination from 'react-bootstrap/Pagination'


class AdminCompanyList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            companyList: [],
            total: 0,
            total_page: [],
            per_page: 10,
            current_page: 1,
            searching: ''
        }
        getCompanyList({ page: this.state.current_page, ordering: '-updated_at' })
            .then(res => {
                let total_page = Math.ceil(res.data.count / this.state.per_page)
                this.setState({
                    companyList: res.data.results,
                    total_page: new Array(total_page).fill(1),
                    total: res.data.count
                })
            })
        this.onSearchChange = this.onSearchChange.bind(this)
        this.onChangePage = this.onChangePage.bind(this)
    }

    onSearchChange(e) {
        if (e.target.value) {
            this.setState({ searching: e.target.value })
            getCompanyList({ search: e.target.value, page: this.state.current_page, ordering: '-updated_at' })
                .then(res => {
                    let total_page = Math.ceil(res.data.count / this.state.per_page)
                    this.setState({
                        companyList: res.data.results,
                        total_page: new Array(total_page).fill(1),
                        total: res.data.count,
                    })
                })

        }
    }

    onChangePage(pageNumber) {
        let params = {}
        if (this.state.searching) {
            params = { search: this.state.searching }
        }

        getCompanyList({ ...params, page: pageNumber, ordering: '-updated_at' })
            .then(
                res => {
                    this.setState({
                        companyList: res.data.results,
                        searching: this.state.searching,
                        current_page: pageNumber
                    })
                }
            )
    }


    render() {
        return (
            <div>
                <Navigator/>
                <div>
                    <FormControl
                        size='sm' type="text" placeholder="Search by company name" className="mr-sm-2 adminSearch"
                        onChange={this.onSearchChange}
                    />
                    <Link to='/admin/company/create'><Button className='createButton'>Tạo mới</Button></Link>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th>Số thứ tự</th>
                        <th>Tên công ty</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.companyList.map((company, idx) => {
                        return (
                            <tr key={company.id}>
                                <td>{idx + 1}</td>
                                <td><Link to={`/admin/company/${company.id}`}>{company.name}</Link></td>
                                <td>{convertUtcTimeToLocalTime(company.created_at)}</td>
                                <td>{convertUtcTimeToLocalTime(company.updated_at)}</td>
                            </tr>
                        )
                    })}

                    </tbody>
                </Table>
                <Pagination>
                    {
                        this.state.total_page.map((data, idx) => {
                            return (
                                <Pagination.Item
                                    key={idx}
                                    active={this.state.current_page === (idx + 1)}
                                    onClick={e => this.onChangePage(idx + 1)}
                                >
                                    {idx + 1}
                                </Pagination.Item>
                            )
                        })
                    }
                </Pagination>
            </div>


        )
    }
}

export default AdminCompanyList
