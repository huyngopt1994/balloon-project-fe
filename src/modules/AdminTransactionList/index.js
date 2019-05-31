import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { getTransactionList } from '../../api'
import Navigator from '../../components/AdminNav'


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
    }

    render() {
        return (
            <div>
                <Navigator/>
                <div>
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
                    {this.state.transactionList.map((transaction,idx) => {
                        return (
                            <tr key={transaction.id}>
                                <td>{idx + 1}</td>
                                <td><Link to={`/admin/transaction/${transaction.id}`}>{transaction.id}</Link></td>
                                <td>{transaction.type}</td>
                                <td>{transaction.total_price_after_vat}</td>
                                <td><Link to={`/admin/company/${transaction.company.id}`}>{transaction.company.name}</Link></td>
                                <td>{transaction.signed_name}</td>
                                <td>{transaction.created_at}</td>
                                <td>{transaction.updated_at}</td>
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
