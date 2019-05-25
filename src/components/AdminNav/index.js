import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap'

class Navigator extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Trang Quản lý</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Nav className="mr-auto">
                    <Nav.Link href="/admin/">Công ty</Nav.Link>
                    <Nav.Link href="/admin/product">Sản Phẩm</Nav.Link>
                    <Nav.Link href="/admin/transaction">Giao Dịch</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

export default Navigator
