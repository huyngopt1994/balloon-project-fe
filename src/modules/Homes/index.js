import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import ControlledCarousel from '../../components/ControlCarousel'
import Product from '../../components/ProductDetail'

class Home extends Component {
    render() {
        return (
            <div>
                {/*<ControlledCarousel/>*/}
                <Container>

                    <Row>
                        <Col><Product/></Col>
                        <Col><Product/></Col>
                        <Col><Product/></Col>
                    </Row>
                </Container>
            </div>

        )
    }
}

export default Home
