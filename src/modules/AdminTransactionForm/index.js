import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { Redirect } from 'react-router-dom'
import { createTransaction, getCompanyList, getProductList } from '../../api'
import Navigator from '../../components/AdminNav'
import { error, success } from '../../components/toastr'

class AdminTransactionForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            transport_fee: 0,
            company_id: '',
            transaction_products: [],
            signed_name: '',
            total_price_before_vat: 0,
            total_price_after_vat: 0,
            companyList: [],
            productList: [],
            address_transport: '',
            redirect: {
                is_redirect: false,
                path: '',
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleTransportChange = this.handleTransportChange.bind(this)
        this.createCompanyOptions = this.createCompanyOptions.bind(this)
        this.addTransactionProduct = this.addTransactionProduct.bind(this)
        this.handleProductTransactionChange = this.handleProductTransactionChange.bind(this)
        this.preCalculateTotalAfterAndBeforeVat = this.preCalculateTotalAfterAndBeforeVat.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
    }

    componentDidMount() {
        getCompanyList()
            .then(res =>
                this.setState({ companyList: res.data.results }))
            .catch(err => error('Hệ thống bị lỗi xin vui lòng thử lại!')
            )
        getProductList()
            .then(res =>
                this.setState({ productList: res.data.results }))
            .catch(err => error('Hệ thống bị lỗi xin vui lòng thử lại'))
    }

    handleSubmit(event) {
        event.preventDefault();
        let sentData = this.state
        delete sentData.companyList
        delete sentData.productList
        createTransaction(sentData)
            .then(
                res => {
                    success('Tạo hoá đơn thành công!');
                    this.setState({ redirect: { is_redirect: true, path: `/admin/transaction/${res.data.id}` } })
                }
            )
            .catch(
                err => {
                    error('Hệ thống bị lỗi xin vui lòng thử lại!')
                }
            )
    }

    renderRedirect = () => {
        if (this.state.redirect.is_redirect) {
            return <Redirect to={this.state.redirect.path}/>
        }
    }

    preCalculateTotalAfterAndBeforeVat() {
        let totalPriceBeforeTax = parseInt(this.state.transport_fee)
        this.state.transaction_products.map((transaction_product, idx) => {
            totalPriceBeforeTax += parseInt(transaction_product.total_price)
        })
        let totalPriceAfterTax = parseInt(totalPriceBeforeTax * 110 / 100)
        this.setState({
            total_price_before_vat: totalPriceBeforeTax,
            total_price_after_vat: totalPriceAfterTax,
        })

    }

    handleProductTransactionChange(event) {
        let productTransactions = [...this.state.transaction_products]
        productTransactions[event.target.dataset.id][event.target.name] = event.target.value;

        if (event.target.name === 'price' || event.target.name === 'total') {
            let totalPrice = productTransactions[event.target.dataset.id]['price'] * productTransactions[event.target.dataset.id]['total']
            productTransactions[event.target.dataset.id]['total_price'] = totalPrice
        }
        this.setState({ transaction_products: productTransactions }, () => this.preCalculateTotalAfterAndBeforeVat())
    }

    handleChange(event) {

        this.setState({ [event.target.name]: event.target.value })
    }

    handleTransportChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }, () => this.preCalculateTotalAfterAndBeforeVat())
    }

    createCompanyOptions = () => {
        if(this.state.companyList){
            return this.state.companyList.length
                ? this.state.companyList.map(data => (
                    <option key={data.id} value={data.id}>
                        {data.name}
                    </option>
                ))
                : "";
        }
        return "";

    }

    createProductOptions = () => {
        if(this.state.productList){
            return this.state.productList.length
                ? this.state.productList.map(data => (
                    <option key={data.id} value={data.id}>
                        {data.name}
                    </option>
                ))
                : "";
        }
        return "";

    }
    addTransactionProduct = (e) => {
        this.setState(prevState => ({
            transaction_products: [...prevState.transaction_products, {
                product_id: '',
                price: 0,
                total: 0,
                total_price: 0
            }]
        }))
    }

    render() {
        return (
            <div>
                <Navigator/>
                {this.renderRedirect()}

                {!this.state.redirect.is_redirect &&
                <Form
                    onSubmit={this.handleSubmit}
                >
                    <Form.Row>
                        <Form.Group sm="3" as={Col} controlId="exampleForm.ControlSelectType">
                            <Form.Label>Loại hoá đơn</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={this.handleChange}
                                name="type"
                            >
                                <option disabled selected value> -- Vui lòng lựa chọn --</option>
                                <option value="NT">Thông thường</option>
                                <option value="RT">Đỏ</option>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelectType">
                            <Form.Label>Công ty</Form.Label>
                            <Form.Control as="select"
                                          name='company_id'
                                          onChange={this.handleChange}
                            >
                                <option disabled selected value> -- Vui lòng lựa chọn --</option>
                                {this.createCompanyOptions()}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="exampleForm.ControlText">
                            <Form.Label>Người kí tên</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={this.handleChange}
                                name='signed_name'
                                value={this.state.signed_name}>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                        <Form.Group >
                            <Form.Label>Địa chỉ giao hàng</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={this.handleChange}
                                name='address_transport'
                                value={this.state.address_transport}>
                            </Form.Control>
                        </Form.Group>
                    <hr/>
                    <Button className='add-more-product' onClick={this.addTransactionProduct}>Thêm sản phẩm</Button>
                    {
                        this.state.transaction_products.map((transaction_product, idx) => {
                            return (
                                <Form.Row key={idx}>
                                    <Form.Group md='3' as={Col} controlId="formGridBeforeVAT">
                                        <Form.Label>Sản phẩm</Form.Label>
                                        <Form.Control
                                            data-id={idx}
                                            as="select"
                                            name='product_id'
                                            onChange={this.handleProductTransactionChange}
                                        >
                                            <option disabled selected> -- Vui lòng lựa chọn --</option>
                                            {this.createProductOptions()}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group md='3' as={Col} controlId="formGridBeforeVAT">
                                        <Form.Label>Giá</Form.Label>
                                        <Form.Control
                                            data-id={idx}
                                            type="number"
                                            name='price'
                                            value={transaction_product.price}
                                            onChange={this.handleProductTransactionChange}
                                        />
                                    </Form.Group>
                                    <Form.Group md='3' as={Col} controlId="formGridBeforeVAT">
                                        <Form.Label>Số lượng</Form.Label>
                                        <Form.Control
                                            data-id={idx}
                                            type="number"
                                            name='total'
                                            value={transaction_product.total}
                                            onChange={this.handleProductTransactionChange}
                                        />
                                    </Form.Group>
                                    <Form.Group md='3' as={Col} controlId="formGridBeforeVAT">
                                        <Form.Label>Tổng tiền</Form.Label>
                                        <Form.Control
                                            data-id={idx}
                                            disabled
                                            type="number"
                                            name='total_price'
                                            value={transaction_product.total_price}
                                        />
                                    </Form.Group>
                                </Form.Row>
                            )
                        })
                    }
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
                }

            </div>

        )

    }
}

export default AdminTransactionForm
