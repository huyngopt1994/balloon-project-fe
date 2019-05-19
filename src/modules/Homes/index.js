import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../../components/Footer'
import Navigator from '../../components/Navigator'
import Product from '../../components/ProductDetail'

class Home extends Component {
    render() {
        return (
            <div>
                <Navigator />
                <Container>
                    <Row>
                        <Col><Product/></Col>
                        <Col><Product/></Col>
                        <Col><Product/></Col>
                    </Row>
                </Container>
                <Footer/>
            </div>

        )
    }
}

export default Home
