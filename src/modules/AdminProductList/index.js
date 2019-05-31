import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { getProductList } from '../../api'
import Navigator from '../../components/AdminNav'
import { convertUtcTimeToLocalTime } from '../../utils'

let pagination = {
    activePage: 1,
    pageSize: 10,
    pages: ['1212', '12121'],
    totalPage: 20150

}

class AdminProductList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productList: []
        }
        getProductList()
            .then(res => {
                this.setState({ productList: res.data.results })
            })
        this.onSearchChange = this.onSearchChange.bind(this)
    }

    onSearchChange(e) {
        if (e.target.value) {
            getProductList({ search: e.target.value })
                .then(res => {
                    this.setState({ productList: res.data.results })
                })

        }
    }

    render() {
        return (
            <div>
                <Navigator/>
                <div>
                    <FormControl
                        size='sm' type="text" placeholder="Search" className="mr-sm-2 adminSearch"
                        onChange={this.onSearchChange}
                    />
                    <Link to='/admin/product/create'><Button className='createButton'>Tạo mới</Button></Link>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th>Số thứ tự</th>
                        <th>Tên sản phẩm</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.productList.map((product, idx) => {
                        return (
                            <tr key={product.id}>
                                <td>{idx + 1}</td>
                                <td><Link to={`/admin/product/${product.id}`}>{product.name}</Link></td>
                                <td>{convertUtcTimeToLocalTime(product.created_at)}</td>
                                <td>{convertUtcTimeToLocalTime(product.updated_at)}</td>
                            </tr>
                        )
                    })}

                    </tbody>
                </Table>
            </div>


        )
    }
}

export default AdminProductList
