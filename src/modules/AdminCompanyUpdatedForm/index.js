import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import { getCompanyOne, updateCompany } from '../../api'
import Navigator from '../../components/AdminNav'
import { error, success } from '../../components/toastr'

class AdminCompanyUpdatedForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            telephone: '',
            tax_number: '',
            contact_name: '',
            logo: '',
            logoPreview: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
    }

    componentDidMount() {
        const { id } = this.props.match.params
        getCompanyOne(id)
            .then(res => {
                res.data.logoPreview = res.data.logo
                this.setState(res.data)

            })
            .catch(err => {
                error('Hệ thống bị lỗi xin vui lòng thử lại!')
            })
    }

    handleSubmit(event) {
        event.preventDefault();
        updateCompany(this.state)
            .then(
                res => {
                    success('Cập nhật công ty thành công!')
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
            logoPreview: URL.createObjectURL(event.target.files[0])
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
                            <Form.Label>Tên Công Ty</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={this.handleChange}
                                name='name'
                                value={this.state.name}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPicture">
                            <Form.Label>Ảnh Công ty</Form.Label>
                            <Form.Text> <Image className='logo'
                                               src={this.state.logoPreview}/>
                            </Form.Text>

                            <Form.Control
                                type="file"
                                name="logo"
                                onChange={this.handleFileChange}
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
                                value={this.state.telephone}
                            />
                        </Form.Group>

                        <Form.Group md='3' as={Col} controlId="formGridTaxNumber">
                            <Form.Label>Mã số thuế</Form.Label>
                            <Form.Control
                                type="text"
                                name="tax_number"
                                onChange={this.handleChange}
                                value={this.state.tax_number}
                            />
                        </Form.Group>

                        <Form.Group md='3' as={Col} controlId="formGridContact">
                            <Form.Label>Người liên lạc</Form.Label>
                            <Form.Control
                                type="text"
                                name="contact_name"
                                onChange={this.handleChange}
                                value={this.state.contact_name}
                            />
                        </Form.Group>

                    </Form.Row>


                    <Button variant="primary" type="submit">
                        Cập nhật công ty
                    </Button>
                </Form>
            </div>

        )

    }
}

export default AdminCompanyUpdatedForm
