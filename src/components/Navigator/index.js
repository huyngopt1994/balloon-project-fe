import React, { Component } from 'react';
import { Button, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

class Navigator extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Bong Bóng Thanh Dung</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Sản phẩm</Nav.Link>
                        <Nav.Link href="/about-us">Giới thiệu công ty</Nav.Link>
                        <Nav.Link href="/services">Dịch vụ</Nav.Link>
                    </Nav>
                    <NavDropdown title="Danh mục sản phẩm" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Danh mục 1</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Danh mục 2</NavDropdown.Item>
                        <NavDropdown.Divider />
                    </NavDropdown>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Button variant="outline-success">Tìm kiếm</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigator
