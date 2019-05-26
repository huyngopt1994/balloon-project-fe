import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

class Navigator extends Component {
    render() {
        const { location } = this.props
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Trang Quản lý</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Nav activeKey={location.pathname} className="mr-auto">
                    <Nav.Link href="/admin/">Công ty</Nav.Link>
                    <Nav.Link href="/admin/product">Sản Phẩm</Nav.Link>
                    <Nav.Link href="/admin/transaction">Giao Dịch</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

const NavigatorWithRouter = withRouter(Navigator)
export default NavigatorWithRouter
