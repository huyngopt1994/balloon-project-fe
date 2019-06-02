import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { getTransactionList } from '../../api'
import Navigator from '../../components/AdminNav'
import { convertUtcTimeToLocalTime } from '../../utils'


class AdminTransactionList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transactionList: []
        }
        getTransactionList()
            .then(res => {
                this.setState({ transactionList: res.data.results })
            })

        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(e) {
        if (e.target.value) {
            getTransactionList({ company: e.target.value })
                .then(res => {
                    this.setState({ transactionList: res.data.results })
                })

        }
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
            </div>


        )
    }
}

export default AdminTransactionList
