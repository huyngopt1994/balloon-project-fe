import React, { PureComponent } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


class LoginForm extends PureComponent {


    render() {
        return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Địa chỉ Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Mật khẩu"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Đăng nhập
                </Button>
            </Form>
        )
    }
}

export default LoginForm
