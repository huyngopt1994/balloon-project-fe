import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { getProductList } from '../../api'
import Navigator from '../../components/AdminNav'
import { convertUtcTimeToLocalTime } from '../../utils'
import Pagination from 'react-bootstrap/Pagination'


class AdminProductList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productList: [],
            total: 0,
            total_page: [],
            per_page: 10,
            current_page: 1,
            searching: ''
        }
        getProductList({ page: this.state.current_page, ordering: '-updated_at' })
            .then(res => {
                let total_page = Math.ceil(res.data.count / this.state.per_page)
                this.setState({
                    productList: res.data.results,
                    total_page: new Array(total_page).fill(1),
                    total: res.data.count
                })
            })
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }

    onSearchChange(e) {
        if (e.target.value) {
            getProductList({ search: e.target.value, ordering: '-updated_at' })
                .then(res => {
                    this.setState({ productList: res.data.results })
                })

        }
    }

    onChangePage(pageNumber) {
        let params = {}
        if (this.state.searching) {
            params = { search: this.state.searching }
        }

        getProductList({ ...params, page: pageNumber, ordering: '-updated_at' })
            .then(
                res => {
                    this.setState({
                        productList: res.data.results,
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
                        size='sm' type="text" placeholder="Search by product name" className="mr-sm-2 adminSearch"
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

export default AdminProductList
