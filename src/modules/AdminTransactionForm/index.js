import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { createProduct, getCompanyList } from '../../api'
import Navigator from '../../components/AdminNav'
import { error, success } from '../../components/toastr'

class AdminTransactionForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            type: '',
            transport_fee: 0,
            created_at: '',
            updated_at: '',
            company: {
                id: '',
                name: ''
            },
            transaction_products: [],
            signed_name: '',
            total_price_before_vat: 0,
            total_price_after_vat: 0,
            companyList: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleTransportChange = this.handleTransportChange.bind(this)
        this.createCompanyOptions = this.createCompanyOptions.bind(this)
    }

    componentDidMount() {
        getCompanyList()
            .then(res =>
                this.setState({ companyList: res.data.results }))
            .catch(err => error('Hệ thống bị lỗi xin vui lòng thử lại!')
            )
    }

    handleSubmit(event) {
        event.preventDefault();
        createProduct(this.state)
            .then(
                res => {
                    success('Tạo sản phẩm thành công!')
                }
            )
            .catch(
                err => {
                    error('Hệ thống bị lỗi xin vui lòng thử lại!')
                }
            )
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleTransportChange(event) {
        let total_price_before_vat = (parseInt(event.target.value))
        let total_price_after_vat = parseInt(total_price_before_vat * 110 / 100)
        this.setState({
            total_price_before_vat: total_price_before_vat,
            total_price_after_vat: total_price_after_vat,
            [event.target.name]: event.target.value
        })
    }

    createCompanyOptions = () => {
        return this.state.companyList.length
            ? this.state.companyList.map(data => (
                <option key={data.id} value={data.id}>
                    {data.name}
                </option>
            ))
            : "";

    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Navigator/>
                <Form
                    onSubmit={this.handleSubmit}
                >
                    <Form.Row>
                        <Form.Group controlId="exampleForm.ControlSelectType">
                            <Form.Label>Loại hoá đơn</Form.Label>
                            <Form.Control as="select">
                                <option>Thông thường</option>
                                <option>Đỏ</option>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelectType">
                            <Form.Label>Công ty</Form.Label>
                            <Form.Control as="select">
                                {this.createCompanyOptions()}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlSelectType">
                            <Form.Label>Người kí tên</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={this.handleChange}
                                name='signed_name'
                                value={this.state.signed_name}>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <hr/>
                    <Form.Row>
                        <Form.Group md='4' as={Col} controlId="exampleForm.ControlTransport">
                            <Form.Label>Tiền vận chuyển</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={this.handleTransportChange}
                                name='transport_fee'
                                value={this.state.transport_fee}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group md='4' as={Col} controlId="exampleForm.ControlTransport">
                            <Form.Label>Tiền trước VAT</Form.Label>
                            <Form.Control
                                disabled
                                type="number"
                                name='total_price_before_vat'
                                value={this.state.total_price_before_vat}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group md='4' as={Col} controlId="exampleForm.ControlTransport">
                            <Form.Label>Tiền sau VAT</Form.Label>
                            <Form.Control
                                disabled
                                type="number"
                                name='total_price_after_vat'
                                value={this.state.total_price_after_vat}>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        Tạo Hoá đơn
                    </Button>
                </Form>
            </div>

        )

    }
}

export default AdminTransactionForm
