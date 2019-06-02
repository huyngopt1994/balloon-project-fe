import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { getCompanyList } from '../../api'
import Navigator from '../../components/AdminNav'
import { convertUtcTimeToLocalTime } from '../../utils'


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
        this.onSearchChange = this.onSearchChange.bind(this)
    }

    onSearchChange(e) {
        if (e.target.value) {
            getCompanyList({ search: e.target.value })
                .then(res => {
                    this.setState({ companyList: res.data.results })
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
                                <td>{idx+1}</td>
                                <td><Link to={`/admin/company/${company.id}`}>{company.name}</Link></td>
                                <td>{convertUtcTimeToLocalTime(company.created_at)}</td>
                                <td>{convertUtcTimeToLocalTime(company.updated_at)}</td>
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
