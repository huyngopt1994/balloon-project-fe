import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { createProduct, getCompanyList, getProductList } from '../../api'
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
            companyList: [],
            productList: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleTransportChange = this.handleTransportChange.bind(this)
        this.createCompanyOptions = this.createCompanyOptions.bind(this)
        this.addTransactionProduct = this.addTransactionProduct.bind(this)
        this.handleProductTransactionChange = this.handleProductTransactionChange.bind(this)
        this.preCalculateTotalAfterAndBeforeVat = this.preCalculateTotalAfterAndBeforeVat.bind(this)
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
        return this.state.companyList.length
            ? this.state.companyList.map(data => (
                <option key={data.id} value={data.id}>
                    {data.name}
                </option>
            ))
            : "";

    }

    createProductOptions = () => {
        return this.state.productList.length
            ? this.state.productList.map(data => (
                <option key={data.id} value={data.id}>
                    {data.name}
                </option>
            ))
            : "";

    }
    addTransactionProduct = (e) => {
        this.setState(prevState => ({
            transaction_products: [...prevState.transaction_products, {
                product_name: '',
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
                                            value={transaction_product.product_name}
                                            name='product_name'
                                            onChange={this.handleProductTransactionChange}
                                        >
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
            </div>

        )

    }
}

export default AdminTransactionForm
