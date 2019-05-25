import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { getTransactionList } from '../../api'
import Navigator from '../../components/AdminNav'

let pagination = {
    activePage: 1,
    pageSize: 10,
    pages: ['1212', '12121'],
    totalPage: 20150

}

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
                    <Button className='createButton'>Tạo mới</Button>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th>Số thứ tự</th>
                        <th>Loại</th>
                        <th>Tổng</th>
                        <th>Giá</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.transactionList.map(transaction => {
                        return (
                            <tr key={transaction.id}>
                                <td><Link to={`/admin/transaction/${transaction.id}`}>{transaction.id}</Link></td>
                                <td>{transaction.type}</td>
                                <td>{transaction.total}</td>
                                <td>{transaction.price}</td>
                                <td>{transaction.product.name}</td>
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
