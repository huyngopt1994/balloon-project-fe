import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { createProduct } from '../../api'
import Navigator from '../../components/AdminNav'
import { error, success } from '../../components/toastr'

class AdminProductForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            image: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
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

    handleFileChange(event) {
        this.setState({ [event.target.name]: event.target.files[0] })
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
                            <Form.Label>Tên Sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Điền tên"
                                onChange={this.handleChange}
                                name='name'
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPicture">
                            <Form.Label>Ảnh Sản Phẩm</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={this.handleFileChange}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group  as={Col} controlId="formGridDescription">
                            <Form.Label>Chi tiết sản phẩm</Form.Label>
                            <Form.Control
                                size='lg'
                                as='textarea'
                                type="text"
                                onChange={this.handleChange}
                                name='description'
                            />
                        </Form.Group>
                    </Form.Row>


                    <Button variant="primary" type="submit">
                        Tạo Sản Phẩm
                    </Button>
                </Form>
            </div>

        )

    }
}

export default AdminProductForm
