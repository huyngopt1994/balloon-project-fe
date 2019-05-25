import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { getCompanyList } from '../../api'
import Navigator from '../../components/AdminNav'

let pagination = {
    activePage: 1,
    pageSize: 10,
    pages: ['1212', '12121'],
    totalPage: 20150

}

class AdminCompanyList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            companyList: []
        }
        getCompanyList()
            .then(res => {
                this.setState({ companyList: res.data.results })
            })
    }

    render() {
        return (
            <div>
                <Navigator/>
                <div>
                    <Link to='/admin/company/create'><Button className='createButton'>Tạo mới</Button></Link>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th>Số thứ tự</th>
                        <th>Tên Công ty</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.companyList.map(company => {
                        return (
                            <tr key={company.id}>
                                <td><Link to={`/admin/company/${company.id}`}>{company.id}</Link></td>
                                <td>{company.name}</td>
                                <td>{company.created_at}</td>
                                <td>{company.updated_at}</td>
                            </tr>
                        )
                    })}

                    </tbody>
                </Table>
            </div>


        )
    }
}

export default AdminCompanyList
