import React, { Component } from 'react';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { getTransactionOne } from '../../api'
import Navigator from '../../components/AdminNav'
import { error } from '../../components/toastr'
import { convertUtcTimeToLocalTime } from '../../utils'

class AdminTransactionReadForm extends Component {
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
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params
        getTransactionOne(id)
            .then(res => {
                this.setState(res.data)

            })
            .catch(err => {
                error('Hệ thống bị lỗi xin vui lòng thử lại!')
            })
    }

    render() {

        return (
            <div>
                <Navigator/>
                <Form
                >
                    <Form.Row>
                        <Form.Group md='3' as={Col} controlId="formGridName">
                            <Form.Label>Loại hoá đơn</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                name='type'
                                value={this.state.type}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group md='4' as={Col} controlId="formGridTaxNumber">
                            <Form.Label>Giờ tạo</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                name="tax_number"
                                value={convertUtcTimeToLocalTime(this.state.created_at)}
                            />
                        </Form.Group>

                        <Form.Group md='4' as={Col} controlId="formGridPhone">
                            <Form.Label>Người kí tên</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                name='signed_name'
                                value={this.state.signed_name}
                            />
                        </Form.Group>

                        <Form.Group md='4' as={Col} controlId="formGridCompanyName">
                            <Form.Label>Tên công ty</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                name='company_name'
                                value={this.state.company.name}
                            />
                        </Form.Group>
                    </Form.Row>
                    <hr/>
                    {
                        this.state.transaction_products.map(transaction_product => {
                            return (
                                <Form.Row key={transaction_product.id} >
                                    <Form.Group md='3' as={Col} controlId="formGridBeforeVAT">
                                        <Form.Label>Sản phẩm</Form.Label>
                                        <Form.Control
                                            disabled
                                            type="text"
                                            name='product_name'
                                            value={transaction_product.product_name}
                                        />
                                    </Form.Group>
                                    <Form.Group md='3' as={Col} controlId="formGridBeforeVAT">
                                        <Form.Label>Giá</Form.Label>
                                        <Form.Control
                                            disabled
                                            type="number"
                                            name='price'
                                            value={transaction_product.price}
                                        />
                                    </Form.Group>
                                    <Form.Group md='3' as={Col} controlId="formGridBeforeVAT">
                                        <Form.Label>Số lượng</Form.Label>
                                        <Form.Control
                                            disabled
                                            type="number"
                                            name='total'
                                            value={transaction_product.total}
                                        />
                                    </Form.Group>
                                    <Form.Group md='3' as={Col} controlId="formGridBeforeVAT">
                                        <Form.Label>Tổng tiền</Form.Label>
                                        <Form.Control
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
                        <Form.Group md='4' as={Col} controlId="formGridTransportFee">
                            <Form.Label>Tiền vận chuyển</Form.Label>
                            <Form.Control
                                disabled
                                type="number"
                                name='transport_fee'
                                value={this.state.transport_fee}
                            />
                        </Form.Group>
                        <Form.Group md='4' as={Col} controlId="formGridBeforeVAT">
                            <Form.Label>Tiền Trước VAT</Form.Label>
                            <Form.Control
                                disabled
                                type="number"
                                name='total_price_before_vat'
                                value={this.state.total_price_before_vat}
                            />
                        </Form.Group>
                        <Form.Group md='4' as={Col} controlId="formGridAfterVAT">
                            <Form.Label>Tiền Sau VAT</Form.Label>
                            <Form.Control
                                disabled
                                type="number"
                                name='total_price_after_vat'
                                value={this.state.total_price_after_vat}
                            />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>

        )
    }
}

export default AdminTransactionReadForm
