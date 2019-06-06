import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { getTransactionList } from '../../api'
import Navigator from '../../components/AdminNav'
import { convertUtcTimeToLocalTime } from '../../utils'

class AdminTransactionList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transactionList: [],
            total: 0,
            total_page: [],
            per_page: 10,
            current_page: 1,
            searching: ''
        }
        getTransactionList({ page: this.state.current_page })
            .then(res => {
                let total_page = Math.ceil(res.data.count / this.state.per_page)
                this.setState({
                    transactionList: res.data.results,
                    total_page: new Array(total_page).fill(1),
                    total: res.data.count
                })
            })

        this.onSearchChange = this.onSearchChange.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }


    onSearchChange(e) {
        if (e.target.value) {
            this.setState({ searching: e.target.value })
            getTransactionList({ company: e.target.value, page: this.state.current_page })
                .then(res => {
                    let total_page = Math.ceil(res.data.count / this.state.per_page)
                    this.setState({
                        transactionList: res.data.results,
                        total_page: new Array(total_page).fill(1),
                        total: res.data.count,
                    })
                })

        }
    }

    onChangePage(pageNumber) {
        let params = {}
        if (this.state.searching) {
            params = { company: this.state.searching }
        }

        getTransactionList({ ...params, page: pageNumber })
            .then(
                res => {
                    this.setState({
                        transactionList: res.data.results,
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
                    <Link to='/admin/transaction/create'><Button className='createButton'>Tạo mới</Button></Link>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th>Số thứ tự</th>
                        <th>Id hoá đơn</th>
                        <th>Loại</th>
                        <th>Tổng Sau VAT</th>
                        <th>Tên người mua</th>
                        <th>Người kí tên</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.transactionList.map((transaction, idx) => {
                        return (
                            <tr key={transaction.id}>
                                <td>{idx + 1}</td>
                                <td><Link to={`/admin/transaction/${transaction.id}`}>{transaction.id}</Link></td>
                                <td>{transaction.type}</td>
                                <td>{transaction.total_price_after_vat}</td>
                                <td><Link
                                    to={`/admin/company/${transaction.company.id}`}>{transaction.company.name}</Link>
                                </td>
                                <td>{transaction.signed_name}</td>
                                <td>{convertUtcTimeToLocalTime(transaction.created_at)}</td>
                                <td>{convertUtcTimeToLocalTime(transaction.updated_at)}</td>
                            </tr>
                        )
                    })}

                    </tbody>
                </Table>
                <Pagination >
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

export default AdminTransactionList
