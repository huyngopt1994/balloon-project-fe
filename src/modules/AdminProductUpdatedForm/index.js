import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import { getProductOne, updateProduct } from '../../api'
import Navigator from '../../components/AdminNav'
import { error, success } from '../../components/toastr'

class AdminProductUpdatedForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            image: '',
            contact_name: '',
            imagePreview: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
    }

    componentDidMount() {
        const { id } = this.props.match.params
        getProductOne(id)
            .then(res => {
                res.data.imagePreview = res.data.image
                this.setState(res.data)

            })
            .catch(err => {
                error('Hệ thống bị lỗi xin vui lòng thử lại!')
            })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { id } = this.props.match.params
        let data = this.state
        if (typeof (data.image) === 'string') {
            delete data['image']
        }
        updateProduct(id, data)
            .then(
                res => {
                    success('Cập nhật sản phẩm thành công!')
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
        this.setState({
            [event.target.name]: event.target.files[0],
            imagePreview: URL.createObjectURL(event.target.files[0])
        })
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
                                onChange={this.handleChange}
                                name='name'
                                value={this.state.name}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPicture">
                            <Form.Label>Ảnh Sản Phẩm</Form.Label>
                            <Form.Text> <Image className='logo'
                                               src={this.state.imagePreview}/>
                            </Form.Text>

                            <Form.Control
                                type="file"
                                name="image"
                                onChange={this.handleFileChange}
                            />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group md='3' as={Col} controlId="formGridDescription">
                            <Form.Label>Chi tiết sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={this.handleChange}
                                name='description'
                                value={this.state.description}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit">
                        Cập nhật sản phẩm
                    </Button>
                </Form>
            </div>

        )
    }
}

export default AdminProductUpdatedForm
