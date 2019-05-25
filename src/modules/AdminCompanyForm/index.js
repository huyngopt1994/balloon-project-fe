import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Navigator from '../../components/AdminNav'

class AdminCompanyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            telephone: '',
            tax_number: '',
            contact_name: '',
            logo: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {

        return (
            <div>
                <Navigator/>
                <Form
                    onSubmit={this.handleSubmit}
                >
                    <Form.Row>
                        <Form.Group md='3' as={Col} controlId="formGridName">
                            <Form.Label>Tên Công Ty</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Điền tên"
                                onChange={this.handleChange}
                                name='name'
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPicture">
                            <Form.Label>Ảnh Công ty</Form.Label>
                            <Form.Control
                                type="file"
                                name="logo"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group md='3' as={Col} controlId="formGridPhone">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={this.handleChange}
                                name='telephone'
                            />
                        </Form.Group>

                        <Form.Group md='3' as={Col} controlId="formGridTaxNumber">
                            <Form.Label>Mã số thuế</Form.Label>
                            <Form.Control
                                type="text"
                                name="tax_number"
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Form.Group md='3' as={Col} controlId="formGridContact">
                            <Form.Label>Người liên lạc</Form.Label>
                            <Form.Control
                                type="text"
                                name="contact_name"
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                    </Form.Row>


                    <Button variant="primary" type="submit">
                        Tạo công ty
                    </Button>
                </Form>
            </div>

        )

    }
}

export default AdminCompanyForm
